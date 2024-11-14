import { http } from '@renderer/utils/http'
import { PaginationRequest, PaginationResponse } from '../types/pagination'
import { FeedbackEntity } from '../types/entities'

export class CreateFeedbackRequestDto implements Partial<FeedbackEntity> {
    carId: number = 0
    comment: string = ''
    rating: number = 0
    userId: number = 0
}

export interface CreateFeedbackResponseDto {
    tip: string
    feedback: FeedbackEntity
}

export class FindPageFeedbackRequestDto implements PaginationRequest, Partial<FeedbackEntity> {
    page: number = 1
    pageSize: number = 10
    carId?: number
    comment?: string
    createdAt?: Date
    id?: number
    rating?: number
    userId?: number
}

export interface FindPageFeedbackResponseDto extends PaginationResponse {
    list: FeedbackEntity[]
}

export interface FindOneFeedbackResponseDto {
    feedback: FeedbackEntity
}

export class UpdateFeedbackRequestDto implements Partial<CreateFeedbackRequestDto> {
    carId?: number
    comment?: string
    rating?: number
    userId?: number
}

export interface UpdateFeedbackResponseDto {
    tip: string
    feedback: FeedbackEntity
}

export default {
    // 创建
    create: async (body: CreateFeedbackRequestDto) =>
        await http<CreateFeedbackRequestDto, CreateFeedbackResponseDto>({
            method: 'post',
            url: '/feedback',
            body
        }),

    // 分页查询
    findPage: async (params: FindPageFeedbackRequestDto) =>
        await http<FindPageFeedbackRequestDto, FindPageFeedbackResponseDto>({
            method: 'get',
            url: '/feedback',
            params
        }),

    // 详细查询
    findOne: async (id: number) =>
        await http<object, FindPageFeedbackResponseDto>({
            method: 'get',
            url: `/feedback/${id}`
        }),

    // 更改
    update: async (id: number, body: UpdateFeedbackRequestDto) =>
        await http<UpdateFeedbackRequestDto, UpdateFeedbackResponseDto>({
            method: 'patch',
            url: `/feedback/${id}`,
            body
        }),

    // 删除
    remove: async (id: number) =>
        await http({
            method: 'delete',
            url: `/feedback/${id}`
        })
}
