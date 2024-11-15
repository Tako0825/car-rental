import { HttpException, Injectable } from '@nestjs/common'
import { UpdateUserRequestDto, UpdateUserResponseDto } from './dtos/update-user.dto'
import {
    FindPageUserRequestDto,
    FindPageUserResponseDto,
    FindOneUserResponseDto
} from './dtos/find-user.dto'
import { PrismaService } from 'src/providers/prisma/prisma.service'
import { omit, pick } from 'lodash'
import { UserEntity } from 'src/types/entities'
import { AuthService } from '../auth/auth.service'

@Injectable()
export class UserService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly authService: AuthService
    ) {}

    // 分页查询
    async findPage(body: FindPageUserRequestDto): Promise<FindPageUserResponseDto> {
        const { page, pageSize, ...other } = body
        const filters = pick(other, Object.keys(new UserEntity()))

        const { list, current, total } = await this.prisma.findPage<UserEntity>({
            model: 'user',
            page,
            pageSize,
            orderBy: { updatedAt: 'desc' },
            filters
        })

        return {
            list: list.map(user => omit(user, ['password', 'email'])),
            pagination: {
                current,
                pageSize,
                total
            }
        }
    }

    // 详细查询
    async findOne(id: number): Promise<FindOneUserResponseDto> {
        const dbUser = await this.prisma.findUserEntity(id)
        return {
            user: omit(dbUser, ['password', 'email'])
        }
    }

    // 更改
    async update(id: number, body: UpdateUserRequestDto): Promise<UpdateUserResponseDto> {
        const [email, password] = [body['email'], body['password']]
        if (email) {
            const dbUser = await this.prisma.user.findUnique({ where: { email } })
            if (dbUser) {
                throw new HttpException({ tip: '邮箱已被占用' }, 422)
            }
        }

        const passwordHash = password ? this.authService.hashPassword(password) : undefined
        const updatedUser = await this.prisma.user.update({
            where: { id },
            data: { ...body, password: passwordHash }
        })

        return {
            tip: '更改成功',
            user: omit(updatedUser, ['password', 'email'])
        }
    }

    // 删除
    async remove(id: number) {
        const dbUser = await this.prisma.user.findUnique({
            where: { id },
            select: { rentals: true, cars: true }
        })
        if (!dbUser) throw new HttpException({ tip: '用户不存在' }, 422)

        const carIds = dbUser.cars.map(car => car.id)
        const rentalsFromCar = await this.prisma.rental.findMany({
            where: { carId: { in: carIds } }
        })
        const rentalsFromUser = dbUser.rentals
        const rentalIds = [...rentalsFromCar, ...rentalsFromUser].map(rental => rental.id)

        try {
            await this.prisma.$transaction(async () => {
                const userId = id
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
        } catch (error) {
            throw new HttpException({ tip: '删除失败' }, 500)
        }
    }
}
