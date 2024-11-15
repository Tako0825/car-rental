import { HttpException, Injectable } from '@nestjs/common'
import { CreateRentalRequestDto, CreateRentalResponseDto } from './dtos/create-rental.dto'
import { UpdateRentalRequestDto, UpdateRentalResponseDto } from './dtos/update-rental.dto'
import { PrismaService } from 'src/providers/prisma/prisma.service'
import {
    FindOneRentalResponseDto,
    FindPageRentalRequestDto,
    FindPageRentalResponseDto
} from './dtos/find-rental.dto'
import { RentalEntity } from 'src/types/entities'
import { pick } from 'lodash'

@Injectable()
export class RentalService {
    constructor(private readonly prisma: PrismaService) {}

    // 创建
    async create(body: CreateRentalRequestDto): Promise<CreateRentalResponseDto> {
        const { carId, userId } = body
        await this.prisma.findUserEntity(userId)
        await this.prisma.findCarEntity(carId)

        const createdRental = await this.prisma.rental.create({ data: body })
        return {
            tip: '创建成功',
            rental: createdRental
        }
    }

    // 分页查询
    async findPage(body: FindPageRentalRequestDto): Promise<FindPageRentalResponseDto> {
        const { page, pageSize, ...other } = body
        const filters = pick(other, Object.keys(new RentalEntity()))

        const { list, current, total } = await this.prisma.findPage<RentalEntity>({
            model: 'rental',
            page,
            pageSize,
            orderBy: { updatedAt: 'desc' },
            filters
        })

        return {
            list,
            pagination: {
                current,
                pageSize,
                total
            }
        }
    }

    // 详细查询
    async findOne(id: number): Promise<FindOneRentalResponseDto> {
        const dbRental = await this.prisma.rental.findUnique({ where: { id } })
        if (!dbRental) {
            throw new HttpException({ tip: '租赁记录不存在' }, 422)
        }
        return {
            rental: dbRental
        }
    }

    // 更改
    async update(id: number, body: UpdateRentalRequestDto): Promise<UpdateRentalResponseDto> {
        if (id) await this.prisma.findRentalEntity(id)
        if (body.userId) await this.prisma.findUserEntity(body.userId)
        if (body.carId) await this.prisma.findCarEntity(body.carId)

        const updatedRental = await this.prisma.rental.update({
            where: { id },
            data: body
        })

        return {
            tip: '更改成功',
            rental: updatedRental
        }
    }

    // 删除
    async remove(id: number) {
        await this.prisma.findRentalEntity(id)
        await this.prisma.$transaction(async () => {
            await this.prisma.payment.deleteMany({ where: { rentalId: id } })
            await this.prisma.rental.delete({ where: { id } })
        })
        return {
            tip: '删除成功'
        }
    }
}
