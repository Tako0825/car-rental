import { IsOptional } from 'class-validator'
import { CarMaintenanceEntity } from 'src/types/entities'

export class UpdateCarMaintenanceRequestDto implements Partial<CarMaintenanceEntity> {
    @IsOptional()
    carId?: number
    @IsOptional()
    maintenanceType?: string
    @IsOptional()
    description?: string
}

export class UpdateCarMaintenanceResponseDto {
    tip: string
    carMaintenance: CarMaintenanceEntity
}
