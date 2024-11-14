import { UserEntity } from '../types/entities'

import { PaginationRequest, PaginationResponse } from '../types/pagination'
import { RoleEnum } from '../types/enums'
import { http } from '@renderer/utils/http'

export class FindPageUserRequestDto implements PaginationRequest, Partial<UserEntity> {
    page: number = 1
    pageSize: number = 10
    id?: number
    createdAt?: Date
    email?: string
    role?: RoleEnum
    updatedAt?: Date
    username?: string
}

export interface FindPageUserResponseDto extends PaginationResponse {
    list: Omit<UserEntity, 'password' | 'email'>[]
}

export interface FindOneUserResponseDto {
    user: Omit<UserEntity, 'password' | 'email'>
}

export class UpdateUserRequestDto implements Partial<UserEntity> {
    email?: string
    password?: string
    role?: RoleEnum
    username?: string
}

export interface UpdateUserResponseDto {
    tip: string
    user: Omit<UserEntity, 'password' | 'email'>
}

export default {
    // 分页查询
    findPage: async (params: FindPageUserRequestDto) =>
        await http<FindPageUserRequestDto, FindPageUserResponseDto>({
            method: 'get',
            url: '/user',
            params
        }),

    // 详细查询
    findOne: async (id: number) =>
        await http<object, FindPageUserResponseDto>({
            method: 'get',
            url: `/user/${id}`
        }),

    // 更改
    update: async (id: number, body: UpdateUserRequestDto) =>
        await http<UpdateUserRequestDto, UpdateUserResponseDto>({
            method: 'patch',
            url: `/user/${id}`,
            body
        }),

    // 删除
    remove: async (id: number) =>
        await http({
            method: 'delete',
            url: `/user/${id}`
        })
}
