import { IsNotEmpty, IsNumber, MaxLength } from 'class-validator'
import { CarMaintenanceEntity } from 'src/types/entities'

export class CreateCarMaintenanceRequestDto implements Partial<CarMaintenanceEntity> {
    @IsNotEmpty({ message: '缺乏车辆' })
    @IsNumber({}, { message: '非数字类型' })
    carId: number
    @IsNotEmpty({ message: '缺乏维修类型' })
    @MaxLength(10, { message: '维修类型最长不得超过 10 个字符' })
    maintenanceType: string
    @IsNotEmpty({ message: '缺乏描述' })
    @MaxLength(100, { message: '描述最长不得超过 100 个字符' })
    description: string
}

export class CreateCarMaintenanceResponseDto {
    tip: string
    carMaintenance: CarMaintenanceEntity
}
