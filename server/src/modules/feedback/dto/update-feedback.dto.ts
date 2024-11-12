import { IsOptional } from 'class-validator'
import { CreateFeedbackRequestDto } from './create-feedback.dto'
import { FeedbackEntity } from 'src/types/entities'

export class UpdateFeedbackRequestDto implements Partial<CreateFeedbackRequestDto> {
    @IsOptional()
    carId: number
    @IsOptional()
    comment: string
    @IsOptional()
    rating: number
    @IsOptional()
    userId: number
}

export class UpdateFeedbackResponseDto {
    tip: string
    feedback: FeedbackEntity
}
