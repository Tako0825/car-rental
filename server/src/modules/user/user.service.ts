import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import {
    UpdateUserRequestDto,
    UpdateUserResponseDto
} from './dtos/update-user.dto'
import {
    FindManyUserRequestDto,
    FindManyUserResponseDto,
    FindOneUserResponseDto
} from './dtos/find-user.dto'
import { PrismaService } from 'src/providers/prisma/prisma.service'
import { omit, pick } from 'lodash'
import { UserEntity } from 'src/types/entities'
import { createHash } from 'crypto'

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    // 分页查询
    async findPage(
        body: FindManyUserRequestDto
    ): Promise<FindManyUserResponseDto> {
        const { page, pageSize, ...other } = body
        const filters = pick(other, Object.keys(new UserEntity()))

        const totalCount = await this.prisma.user.count({ where: filters })
        const totalPages = Math.ceil(totalCount / pageSize)
        const list = await this.prisma.user.findMany({
            where: filters,
            orderBy: {
                updatedAt: 'desc'
            },
            skip: (page - 1) * pageSize,
            take: pageSize,
            select: {
                id: true,
                username: true,
                role: true,
                createdAt: true,
                updatedAt: true,
                password: false,
                email: false
            }
        })

        return {
            page,
            pageSize,
            totalCount,
            totalPages,
            list
        }
    }

    // 详细查询
    async findOne(id: number): Promise<FindOneUserResponseDto> {
        const dbUser = await this.prisma.user.findUnique({ where: { id } })
        if (!dbUser) {
            throw new HttpException(
                { tip: '用户不存在' },
                HttpStatus.UNPROCESSABLE_ENTITY
            )
        }

        return {
            user: omit(dbUser, ['password', 'email'])
        }
    }

    // 更改
    async update(
        id: number,
        body: UpdateUserRequestDto
    ): Promise<UpdateUserResponseDto> {
        if (body['email']) {
            const dbUser = await this.prisma.user.findUnique({
                where: { email: body.email }
            })
            if (dbUser) {
                throw new HttpException(
                    { tip: '邮箱已被占用' },
                    HttpStatus.UNPROCESSABLE_ENTITY
                )
            }
        }

        const data: UpdateUserRequestDto = body['password']
            ? {
                  ...body,
                  password: createHash('sha256')
                      .update(body['password'])
                      .digest('hex')
              }
            : body
        const updatedUser = await this.prisma.user.update({
            where: { id },
            data
        })

        return {
            tip: '更改成功',
            user: omit(updatedUser, ['password', 'email'])
        }
    }

    // 删除
    async remove(id: number) {
        /**
         *  user -> car & rental & feedback
         *  car -> rental & feedback & carMaintenance
         *  rental -> payment
         */
        await this.prisma.$transaction(async () => {
            await this.findOne(id)
            const userId = id
            const dbUser = await this.prisma.user.findUnique({
                where: { id },
                select: {
                    rentals: true,
                    cars: true
                }
            })

            const carIds = dbUser.cars.map(car => car.id)
            const rentalsFromCar = await this.prisma.rental.findMany({
                where: { carId: { in: carIds } }
            })
            const rentalsFromUser = dbUser.rentals
            const rentalIds = [...rentalsFromCar, ...rentalsFromUser].map(
                rental => rental.id
            )

            await this.prisma.payment.deleteMany({
                where: {
                    OR: [{ rentalId: { in: rentalIds } }]
                }
            })
            await Promise.all([
                this.prisma.rental.deleteMany({
                    where: { OR: [{ carId: { in: carIds } }, { userId }] }
                }),
                this.prisma.feedback.deleteMany({
                    where: { OR: [{ carId: { in: carIds } }, { userId }] }
                }),
                this.prisma.carMaintenance.deleteMany({
                    where: { OR: [{ carId: { in: carIds } }] }
                })
            ])
            await this.prisma.car.deleteMany({ where: { userId } })
            await this.prisma.user.delete({ where: { id } })
        })

        return {
            tip: '删除成功'
        }
    }
}
