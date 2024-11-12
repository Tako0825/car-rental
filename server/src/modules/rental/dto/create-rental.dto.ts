import { $Enums } from '@prisma/client'
import { IsDateString, IsEnum, IsNotEmpty, IsNumber } from 'class-validator'
import { RentalEntity } from 'src/types/entities'

export class CreateRentalRequestDto implements Partial<RentalEntity> {
    @IsNotEmpty({ message: '缺乏租赁方' })
    @IsNumber({}, { message: '非数字类型' })
    userId?: number
    @IsNotEmpty({ message: '缺乏状态' })
    @IsEnum($Enums.RentalStatus, { message: '状态错误' })
    status: $Enums.RentalStatus
    @IsNotEmpty({ message: '缺乏车辆' })
    @IsNumber({}, { message: '非数字类型' })
    carId: number
    @IsNotEmpty({ message: '缺乏开始时间' })
    @IsDateString({}, { message: '时间格式错误' })
    startTime: Date
    @IsNotEmpty({ message: '缺乏结束时间' })
    @IsDateString({}, { message: '时间格式错误' })
    endTime: Date
    @IsNotEmpty({ message: '缺乏租赁价格' })
    @IsNumber({}, { message: '非数字类型' })
    totalPrice: number
}

export class CreateRentalResponseDto {
    tip: string
    rental: RentalEntity
}
