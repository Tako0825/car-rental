import { CarMaintenanceEntity } from 'src/types/entities'
import { PaginationRequest, PaginationResponse } from 'src/types/pagination'

export class FindPageCarMaintenanceRequestDto
    extends PaginationRequest
    implements Partial<CarMaintenanceEntity>
{
    id?: number
    createdAt?: Date
    updatedAt?: Date
    carId?: number
    maintenanceType?: string
    description?: string
}

export class FindPageCarMaintenanceResponseDto extends PaginationResponse {
    list: CarMaintenanceEntity[]
}

export class FindOneCarMaintenanceResponseDto {
    carMaintenance: CarMaintenanceEntity
}
