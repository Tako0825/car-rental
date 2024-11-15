import { IsNotEmpty, IsUrl, MaxLength } from 'class-validator'
import { CarEntity } from 'src/types/entities'

export class CreateCarRequestDto implements Partial<CarEntity> {
    @IsNotEmpty({ message: '缺乏品牌' })
    @MaxLength(10, { message: '品牌最长不得超过 10 个字符' })
    make: string

    @IsNotEmpty({ message: '缺乏型号' })
    @MaxLength(20, { message: '型号最长不得超过 20 个字符' })
    model: string

    @IsNotEmpty({ message: '缺乏封面' })
    @IsUrl({}, { message: '非链接格式' })
    cover: string
}

export class CreateCarResponseDto {
    tip: string
    car: CarEntity
}
