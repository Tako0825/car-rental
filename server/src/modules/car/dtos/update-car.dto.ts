import { IsOptional } from 'class-validator'
import { CreateCarRequestDto } from './create-car.dto'
import { $Enums } from '@prisma/client'
import { PartialType } from '@nestjs/mapped-types'
import { CarEntity } from 'src/types/entities'

export class UpdateCarRequestDto extends PartialType(CreateCarRequestDto) {
    @IsOptional()
    batteryLevel?: number
    @IsOptional()
    licensePlate?: string
    @IsOptional()
    location?: string
    @IsOptional()
    make?: string
    @IsOptional()
    model?: string
    @IsOptional()
    pricePerDay?: number
    @IsOptional()
    status?: $Enums.CarStatus
    @IsOptional()
    year?: number
}

export class UpdateCarResponseDto {
    tip: string
    car: CarEntity
}
