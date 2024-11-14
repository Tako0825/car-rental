import { IsNotEmpty, IsNumber, MaxLength } from 'class-validator'
import { FeedbackEntity } from 'src/types/entities'

export class CreateFeedbackRequestDto implements Partial<FeedbackEntity> {
    @IsNotEmpty({ message: '缺乏租赁记录' })
    @IsNumber({}, { message: '非数字类型' })
    carId: number
    @IsNotEmpty({ message: '缺乏租赁记录' })
    @MaxLength(100, { message: '反馈内容最长不得超过 100 个字符' })
    comment: string
    @IsNotEmpty({ message: '缺乏租赁记录' })
    @IsNumber({}, { message: '非数字类型' })
    rating: number
    @IsNotEmpty({ message: '缺乏租赁记录' })
    @IsNumber({}, { message: '非数字类型' })
    userId: number
}

export class CreateFeedbackResponseDto {
    tip: string
    feedback: FeedbackEntity
}
