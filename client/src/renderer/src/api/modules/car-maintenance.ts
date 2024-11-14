import { http } from '@renderer/utils/http'
import { PaginationRequest, PaginationResponse } from '../types/pagination'
import { CarMaintenanceEntity } from '../types/entities'

export class CreateCarMaintenanceRequestDto implements Partial<CarMaintenanceEntity> {
    carId: number = 0
    maintenanceType: string = ''
    description: string = ''
}

export interface CreateCarMaintenanceResponseDto {
    tip: string
    carMaintenance: CarMaintenanceEntity
}

export class FindPageCarMaintenanceRequestDto
    implements PaginationRequest, Partial<CarMaintenanceEntity>
{
    page: number = 1
    pageSize: number = 10
    id?: number
    createdAt?: Date
    updatedAt?: Date
    carId?: number
    maintenanceType?: string
    description?: string
}

export interface FindPageCarMaintenanceResponseDto extends PaginationResponse {
    list: CarMaintenanceEntity[]
}

export interface FindOneCarMaintenanceResponseDto {
    carMaintenance: CarMaintenanceEntity
}

export class UpdateCarMaintenanceRequestDto implements Partial<CarMaintenanceEntity> {
    carId?: number
    maintenanceType?: string
    description?: string
}

export interface UpdateCarMaintenanceResponseDto {
    tip: string
    carMaintenance: CarMaintenanceEntity
}

export default {
    // 创建
    create: async (body: CreateCarMaintenanceRequestDto) =>
        await http<CreateCarMaintenanceRequestDto, CreateCarMaintenanceResponseDto>({
            method: 'post',
            url: '/carMaintenance',
            body
        }),

    // 分页查询
    findPage: async (params: FindPageCarMaintenanceRequestDto) =>
        await http<FindPageCarMaintenanceRequestDto, FindPageCarMaintenanceResponseDto>({
            method: 'get',
            url: '/carMaintenance',
            params
        }),

    // 详细查询
    findOne: async (id: number) =>
        await http<object, FindPageCarMaintenanceResponseDto>({
            method: 'get',
            url: `/carMaintenance/${id}`
        }),

    // 更改
    update: async (id: number, body: UpdateCarMaintenanceRequestDto) =>
        await http<UpdateCarMaintenanceRequestDto, UpdateCarMaintenanceResponseDto>({
            method: 'patch',
            url: `/carMaintenance/${id}`,
            body
        }),

    // 删除
    remove: async (id: number) =>
        await http({
            method: 'delete',
            url: `/carMaintenance/${id}`
        })
}
