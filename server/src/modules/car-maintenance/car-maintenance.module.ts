import { Module } from '@nestjs/common'
import { CarMaintenanceService } from './car-maintenance.service'
import { CarMaintenanceController } from './car-maintenance.controller'

@Module({
    controllers: [CarMaintenanceController],
    providers: [CarMaintenanceService]
})
export class CarMaintenanceModule {}
