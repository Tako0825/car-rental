import { IsOptional } from 'class-validator'
import { $Enums } from '@prisma/client'
import { PartialType } from '@nestjs/mapped-types'
import { CarListingEntity } from 'src/types/entities'
import { CreateCarListingRequestDto } from './create-car-listing.dto'

export class UpdateCarListingRequestDto extends PartialType(CreateCarListingRequestDto) {
    @IsOptional()
    batteryLevel?: number
    @IsOptional()
    carId?: number
    @IsOptional()
    licensePlate?: string
    @IsOptional()
    location?: string
    @IsOptional()
    pricePerDay?: number
    @IsOptional()
    status?: $Enums.CarStatus
    @IsOptional()
    userId?: number
    @IsOptional()
    year?: number
}

export class UpdateCarListingResponseDto {
    tip: string
    carListing: CarListingEntity
}
