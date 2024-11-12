import { $Enums } from '@prisma/client'
import { UserEntity } from 'src/types/entities'
import { PaginationRequest, PaginationResponse } from 'src/types/pagination'

export class FindManyUserRequestDto extends PaginationRequest implements Partial<UserEntity> {
    id?: number
    createdAt?: Date
    email?: string
    role?: $Enums.Role
    updatedAt?: Date
    username?: string
}

export class FindManyUserResponseDto extends PaginationResponse {
    list: Omit<UserEntity, 'password' | 'email'>[]
}

export class FindOneUserResponseDto {
    user: Omit<UserEntity, 'password' | 'email'>
}
