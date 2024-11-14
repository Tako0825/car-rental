import { http } from '@renderer/utils/http'
import { PaginationRequest, PaginationResponse } from '../types/pagination'
import { PaymentEntity } from '../types/entities'
import { PaymentStatusEnum } from '../types/enums'

export class CreatePaymentRequestDto implements Partial<PaymentEntity> {
    rentalId: number = 0
    paymentStatus: PaymentStatusEnum = PaymentStatusEnum.pending
    paymentDate: Date = new Date()
}

export interface CreatePaymentResponseDto {
    tip: string
    payment: PaymentEntity
}

export class FindPagePaymentRequestDto implements PaginationRequest, Partial<PaymentEntity> {
    page: number = 1
    pageSize: number = 10
    id?: number
    rentalId?: number
    paymentStatus?: PaymentStatusEnum.pending
    paymentDate?: Date
}

export interface FindPagePaymentResponseDto extends PaginationResponse {
    list: PaymentEntity[]
}

export interface FindOnePaymentResponseDto {
    payment: PaymentEntity
}

export class UpdatePaymentRequestDto implements Partial<CreatePaymentRequestDto> {
    paymentStatus?: PaymentStatusEnum
    paymentDate?: Date
}

export interface UpdatePaymentResponseDto {
    tip: string
}

export default {
    // 创建
    create: async (body: CreatePaymentRequestDto) =>
        await http<CreatePaymentRequestDto, CreatePaymentResponseDto>({
            method: 'post',
            url: '/payment',
            body
        }),

    // 分页查询
    findPage: async (params: FindPagePaymentRequestDto) =>
        await http<FindPagePaymentRequestDto, FindPagePaymentResponseDto>({
            method: 'get',
            url: '/payment',
            params
        }),

    // 详细查询
    findOne: async (id: number) =>
        await http<object, FindPagePaymentResponseDto>({
            method: 'get',
            url: `/payment/${id}`
        }),

    // 更改
    update: async (id: number, body: UpdatePaymentRequestDto) =>
        await http<UpdatePaymentRequestDto, UpdatePaymentResponseDto>({
            method: 'patch',
            url: `/payment/${id}`,
            body
        }),

    // 删除
    remove: async (id: number) =>
        await http({
            method: 'delete',
            url: `/payment/${id}`
        })
}
