import { Injectable } from '@nestjs/common'
import { CreatePaymentRequestDto, CreatePaymentResponseDto } from './dtos/create-payment.dto'
import { UpdatePaymentRequestDto, UpdatePaymentResponseDto } from './dtos/update-payment.dto'
import { PrismaService } from 'src/providers/prisma/prisma.service'
import {
    FindOnePaymentResponseDto,
    FindPagePaymentRequestDto,
    FindPagePaymentResponseDto
} from './dtos/find-payment.dto'
import { pick } from 'lodash'
import { PaymentEntity } from 'src/types/entities'

@Injectable()
export class PaymentService {
    constructor(private readonly prisma: PrismaService) {}

    // 创建
    async create(body: CreatePaymentRequestDto): Promise<CreatePaymentResponseDto> {
        const { rentalId } = body
        await this.prisma.findRentalEntity(rentalId)

        const createdPayment = await this.prisma.payment.create({ data: body })
        return {
            tip: '创建成功',
            payment: createdPayment
        }
    }

    // 分页查询
    async findPage(body: FindPagePaymentRequestDto): Promise<FindPagePaymentResponseDto> {
        const { page, pageSize, ...other } = body
        const filters = pick(other, Object.keys(new PaymentEntity()))

        const { list, totalCount, totalPages } = await this.prisma.findPage<PaymentEntity>({
            model: 'payment',
            orderBy: { paymentDate: 'desc' },
            filters
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
    async findOne(id: number): Promise<FindOnePaymentResponseDto> {
        const dbPayment = await this.prisma.findPaymentEntity(id)
        return {
            payment: dbPayment
        }
    }

    // 更改
    async update(id: number, body: UpdatePaymentRequestDto): Promise<UpdatePaymentResponseDto> {
        await this.prisma.findPaymentEntity(id)
        const data = pick(body, Object.keys(new PaymentEntity()))

        const updatedPayment = await this.prisma.payment.update({ where: { id }, data })
        return {
            tip: '更改成功',
            payment: updatedPayment
        }
    }

    // 删除
    async remove(id: number) {
        await this.prisma.findPaymentEntity(id)
        await this.prisma.payment.delete({ where: { id } })
        return {
            tip: '删除成功'
        }
    }
}
