import { PartialType } from '@nestjs/mapped-types'
import { CreateRentalRequestDto } from './create-rental.dto'
import { $Enums } from '@prisma/client'
import { IsOptional } from 'class-validator'
import { RentalEntity } from 'src/types/entities'

export class UpdateRentalRequestDto extends PartialType(
    CreateRentalRequestDto
) {
    @IsOptional()
    userId?: number
    @IsOptional()
    carId?: number
    @IsOptional()
    endTime?: Date
    @IsOptional()
    startTime?: Date
    @IsOptional()
    status?: $Enums.RentalStatus
    @IsOptional()
    totalPrice?: number
}

export class UpdateRentalResponseDto {
    tip: string
    rental: RentalEntity
}
