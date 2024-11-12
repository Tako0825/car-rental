import { $Enums } from '@prisma/client'
import { RentalEntity } from 'src/types/entities'
import { PaginationRequest, PaginationResponse } from 'src/types/pagination'

export class FindPageRentalRequestDto
    extends PaginationRequest
    implements Partial<RentalEntity>
{
    id?: number
    createdAt?: Date
    updatedAt?: Date
    userId?: number
    status?: $Enums.RentalStatus
    carId?: number
    startTime?: Date
    endTime?: Date
    totalPrice?: number
}

export class FindPageRentalResponseDto extends PaginationResponse {
    list: RentalEntity[]
}

export class FindOneRentalResponseDto {
    rental: RentalEntity
}
