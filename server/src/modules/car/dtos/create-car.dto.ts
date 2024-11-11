import { $Enums } from '@prisma/client'
import {
    IsEnum,
    IsNotEmpty,
    IsNumber,
    Max,
    MaxLength,
    Min
} from 'class-validator'
import { CarEntity } from 'src/types/entities'

export class CreateCarRequestDto implements Partial<CarEntity> {
    @IsNotEmpty({ message: '缺乏电池电量' })
    @IsNumber({}, { message: '非数字类型' })
    @Min(0, { message: '电池电量不得小于 0 %' })
    @Max(100, { message: '电池电量不得超过 100 %' })
    batteryLevel: number // 电池电量

    @IsNotEmpty({ message: '缺乏牌照' })
    @MaxLength(8, { message: '牌照最长不得超过 8 个字符' })
    licensePlate: string

    @IsNotEmpty({ message: '缺乏车辆所在位置' })
    @MaxLength(100, { message: '车辆所在位置最长不得超过 100 个字符' })
    location: string

    @IsNotEmpty({ message: '缺乏品牌' })
    @MaxLength(10, { message: '品牌最长不得超过 10 个字符' })
    make: string

    @IsNotEmpty({ message: '缺乏型号' })
    @MaxLength(20, { message: '型号最长不得超过 20 个字符' })
    model: string

    @IsNotEmpty({ message: '缺乏租赁价格' })
    @IsNumber({}, { message: '非数字类型' })
    pricePerDay: number

    @IsNotEmpty({ message: '缺乏状态' })
    @IsEnum($Enums.CarStatus, { message: '状态错误' })
    status: $Enums.CarStatus

    @IsNotEmpty({ message: '缺乏年份' })
    @IsNumber({}, { message: '非数字类型' })
    year: number
}

export class CreateCarResponseDto {
    tip: string
    car: CarEntity
}
