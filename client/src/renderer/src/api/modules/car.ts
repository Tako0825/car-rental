import { http } from '@renderer/utils/http'
import { PaginationRequest, PaginationResponse } from '../types/pagination'
import { CarEntity } from '../types/entities'
import { CarStatusEnum } from '../types/enums'

export class CreateCarRequestDto implements Partial<CarEntity> {
    batteryLevel: number = 0 // 电池电量
    licensePlate: string = ''
    location: string = ''
    make: string = ''
    model: string = ''
    pricePerDay: number = 0
    status: CarStatusEnum = CarStatusEnum.available
    year: number = 0
}

export interface CreateCarResponseDto {
    tip: string
    car: CarEntity
}

export class FindPageCarRequestDto implements PaginationRequest, Partial<CarEntity> {
    page: number = 1
    pageSize: number = 10
    batteryLevel?: number
    createdAt?: Date
    id?: number
    licensePlate?: string
    location?: string
    make?: string
    model?: string
    pricePerDay?: number
    status?: CarStatusEnum.available
    updatedAt?: Date
    year?: number
}

export interface FindPageCarResponseDto extends PaginationResponse {
    list: CarEntity[]
}

export interface FindOneCarResponseDto {
    car: CarEntity
}

export class UpdateCarRequestDto implements Partial<CreateCarRequestDto> {
    batteryLevel?: number
    licensePlate?: string
    location?: string
    make?: string
    model?: string
    pricePerDay?: number
    status?: CarStatusEnum
    year?: number
}

export interface UpdateCarResponseDto {
    tip: string
    car: CarEntity
}

export default {
    // 创建
    create: async (body: CreateCarRequestDto) =>
        await http<CreateCarRequestDto, CreateCarResponseDto>({
            method: 'post',
            url: '/car',
            body
        }),

    // 分页查询
    findPage: async (params: FindPageCarRequestDto) =>
        await http<FindPageCarRequestDto, FindPageCarResponseDto>({
            method: 'get',
            url: '/car',
            params
        }),

    // 详细查询
    findOne: async (id: number) =>
        await http<object, FindPageCarResponseDto>({
            method: 'get',
            url: `/car/${id}`
        }),

    // 更改
    update: async (id: number, body: UpdateCarRequestDto) =>
        await http<UpdateCarRequestDto, UpdateCarResponseDto>({
            method: 'patch',
            url: `/car/${id}`,
            body
        }),

    // 删除
    remove: async (id: number) =>
        await http({
            method: 'delete',
            url: `/car/${id}`
        })
}
