import { $Enums } from '@prisma/client'
import { IsEnum, IsNotEmpty, IsNumber, Max, MaxLength, Min } from 'class-validator'
import { CarListingEntity } from 'src/types/entities'

export class CreateCarListingRequestDto implements Partial<CarListingEntity> {
    @IsNotEmpty({ message: '缺乏电池电量' })
    @IsNumber({}, { message: '非数字类型' })
    @Min(0, { message: '电池电量不得小于 0 %' })
    @Max(100, { message: '电池电量不得超过 100 %' })
    batteryLevel: number

    @IsNotEmpty({ message: '缺乏车辆' })
    carId: number

    @IsNotEmpty({ message: '缺乏状态' })
    @IsEnum($Enums.CarStatus, { message: '状态错误' })
    status: $Enums.CarStatus

    @IsNotEmpty({ message: '缺乏出租方' })
    userId: number

    @IsNotEmpty({ message: '缺乏牌照' })
    @MaxLength(8, { message: '牌照最长不得超过 8 个字符' })
    licensePlate: string

    @IsNotEmpty({ message: '缺乏车辆所在位置' })
    @MaxLength(100, { message: '车辆所在位置最长不得超过 100 个字符' })
    location: string

    @IsNotEmpty({ message: '缺乏租赁价格' })
    @IsNumber({}, { message: '非数字类型' })
    pricePerDay: number

    @IsNotEmpty({ message: '缺乏年份' })
    @IsNumber({}, { message: '非数字类型' })
    year: number
}

export class CreateCarListingResponseDto {
    tip: string
    carListing: CarListingEntity
}
