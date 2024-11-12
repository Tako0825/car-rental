import { HttpException, Injectable } from '@nestjs/common'
import {
    CreateRentalRequestDto,
    CreateRentalResponseDto
} from './dto/create-rental.dto'
import {
    UpdateRentalRequestDto,
    UpdateRentalResponseDto
} from './dto/update-rental.dto'
import { PrismaService } from 'src/providers/prisma/prisma.service'
import {
    FindOneRentalResponseDto,
    FindPageRentalRequestDto,
    FindPageRentalResponseDto
} from './dto/find-rental.dto'
import { RentalEntity } from 'src/types/entities'
import { pick } from 'lodash'

@Injectable()
export class RentalService {
    constructor(private readonly prisma: PrismaService) {}

    // 创建
    async create(
        body: CreateRentalRequestDto,
        userId: number
    ): Promise<CreateRentalResponseDto> {
        const createdRental = await this.prisma.rental.create({
            data: { ...body, userId }
        })
        return {
            tip: '创建成功',
            rental: createdRental
        }
    }

    // 分页查询
    async findPage(
        body: FindPageRentalRequestDto
    ): Promise<FindPageRentalResponseDto> {
        const { page, pageSize, ...other } = body
        const filters = pick(other, Object.keys(new RentalEntity()))

        const totalCount = await this.prisma.rental.count({ where: filters })
        const totalPages = Math.ceil(totalCount / pageSize)
        const list = await this.prisma.rental.findMany({
            where: filters,
            orderBy: {
                updatedAt: 'desc'
            },
            skip: (page - 1) * pageSize,
            take: pageSize
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
    async update(
        id: number,
        body: UpdateRentalRequestDto
    ): Promise<UpdateRentalResponseDto> {
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
        /**
         *  rental -> payment
         */
        await this.prisma.$transaction(async () => {
            await this.prisma.payment.deleteMany({ where: { rentalId: id } })
            await this.prisma.rental.delete({ where: { id } })
        })

        return {
            tip: '删除成功'
        }
    }
}
