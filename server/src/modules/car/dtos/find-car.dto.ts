import { $Enums } from '@prisma/client'
import { CarEntity } from 'src/types/entities'
import { PaginationRequest, PaginationResponse } from 'src/types/pagination'

export class FindPageCarRequestDto extends PaginationRequest implements Partial<CarEntity> {
    batteryLevel?: number
    createdAt?: Date
    id?: number
    licensePlate?: string
    location?: string
    make?: string
    model?: string
    page: number
    pageSize: number
    pricePerDay?: number
    status?: $Enums.CarStatus
    updatedAt?: Date
    year?: number
}

export class FindPageCarResponseDto extends PaginationResponse {
    list: CarEntity[]
}

export class FindOneCarResponseDto {
    car: CarEntity
}
