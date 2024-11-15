import { $Enums } from '@prisma/client'
import { CarListingEntity } from 'src/types/entities'
import { PaginationRequest, PaginationResponse } from 'src/types/pagination'

export class FindPageCarListingRequestDto
    extends PaginationRequest
    implements Partial<CarListingEntity>
{
    id?: number
    createdAt?: Date
    updatedAt?: Date
    userId?: number
    carId?: number
    licensePlate?: string
    year?: number
    status?: $Enums.CarStatus
    batteryLevel?: number
    location?: string
    pricePerDay?: number
}

export class FindPageCarListingResponseDto extends PaginationResponse {
    list: CarListingEntity[]
}

export class FindOneCarListingResponseDto {
    carListing: CarListingEntity
}
