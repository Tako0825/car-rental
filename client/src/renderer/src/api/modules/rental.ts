import { http } from '@renderer/utils/http'
import { PaginationRequest, PaginationResponse } from '../types/pagination'
import { RentalEntity } from '../types/entities'
import { RentalStatusEnum } from '../types/enums'

export class CreateRentalRequestDto implements Partial<RentalEntity> {
    userId: number = 0
    status: RentalStatusEnum = RentalStatusEnum.active
    carId: number = 0
    startTime: Date = new Date()
    endTime: Date = new Date()
    totalPrice: number = 0
}

export interface CreateRentalResponseDto {
    tip: string
    rental: RentalEntity
}

export class FindPageRentalRequestDto implements PaginationRequest, Partial<RentalEntity> {
    page: number = 1
    pageSize: number = 10
    id?: number
    createdAt?: Date
    updatedAt?: Date
    userId?: number
    status?: RentalStatusEnum
    carId?: number
    startTime?: Date
    endTime?: Date
    totalPrice?: number
}

export interface FindPageRentalResponseDto extends PaginationResponse {
    list: RentalEntity[]
}

export interface FindOneRentalResponseDto {
    rental: RentalEntity
}

export class UpdateRentalRequestDto implements Partial<CreateRentalRequestDto> {
    userId?: number
    carId?: number
    endTime?: Date
    startTime?: Date
    status?: RentalStatusEnum
    totalPrice?: number
}

export interface UpdateRentalResponseDto {
    tip: string
    rental: RentalEntity
}

export default {
    // 创建
    create: async (body: CreateRentalRequestDto) =>
        await http<CreateRentalRequestDto, CreateRentalResponseDto>({
            method: 'post',
            url: '/rental',
            body
        }),

    // 分页查询
    findPage: async (params: FindPageRentalRequestDto) =>
        await http<FindPageRentalRequestDto, FindPageRentalResponseDto>({
            method: 'get',
            url: '/rental',
            params
        }),

    // 详细查询
    findOne: async (id: number) =>
        await http<object, FindPageRentalResponseDto>({
            method: 'get',
            url: `/rental/${id}`
        }),

    // 更改
    update: async (id: number, body: UpdateRentalRequestDto) =>
        await http<UpdateRentalRequestDto, UpdateRentalResponseDto>({
            method: 'patch',
            url: `/rental/${id}`,
            body
        }),

    // 删除
    remove: async (id: number) =>
        await http({
            method: 'delete',
            url: `/rental/${id}`
        })
}
