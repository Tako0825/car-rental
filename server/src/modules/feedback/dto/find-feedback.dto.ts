import { FeedbackEntity } from 'src/types/entities'
import { PaginationRequest, PaginationResponse } from 'src/types/pagination'

export class FindPageFeedbackRequestDto
    extends PaginationRequest
    implements Partial<FeedbackEntity>
{
    carId?: number
    comment?: string
    createdAt?: Date
    id?: number
    rating?: number
    userId?: number
}

export class FindPageFeedbackResponseDto extends PaginationResponse {
    list: FeedbackEntity[]
}

export class FindOneFeedbackResponseDto {
    feedback: FeedbackEntity
}
