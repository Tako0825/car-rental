import { IsNotEmpty, IsNumber, MaxLength } from 'class-validator'
import { FeedbackEntity } from 'src/types/entities'

export class CreateFeedbackRequestDto implements Partial<FeedbackEntity> {
    @IsNotEmpty({ message: '缺乏反馈内容' })
    @MaxLength(100, { message: '反馈内容最长不得超过 100 个字符' })
    comment: string

    @IsNotEmpty({ message: '缺乏租赁记录' })
    @IsNumber({}, { message: '非数字类型' })
    rating: number

    @IsNotEmpty({ message: '缺乏反馈方' })
    @IsNumber({}, { message: '非数字类型' })
    userId: number

    @IsNotEmpty({ message: '缺乏车辆' })
    @IsNumber({}, { message: '非数字类型' })
    carListingId: number
}

export class CreateFeedbackResponseDto {
    tip: string
    feedback: FeedbackEntity
}
