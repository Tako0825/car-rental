import { Injectable } from '@nestjs/common'
import { pick } from 'lodash'
import { PrismaService } from 'src/providers/prisma/prisma.service'
import { FeedbackEntity } from 'src/types/entities'
import { CreateFeedbackRequestDto, CreateFeedbackResponseDto } from './dtos/create-feedback.dto'
import {
    FindPageFeedbackRequestDto,
    FindPageFeedbackResponseDto,
    FindOneFeedbackResponseDto
} from './dtos/find-feedback.dto'
import { UpdateFeedbackRequestDto, UpdateFeedbackResponseDto } from './dtos/update-feedback.dto'

@Injectable()
export class FeedbackService {
    constructor(private readonly prisma: PrismaService) {}

    // 创建
    async create(body: CreateFeedbackRequestDto): Promise<CreateFeedbackResponseDto> {
        const { carId, userId } = body
        await this.prisma.findCarEntity(carId)
        await this.prisma.findUserEntity(userId)

        const createdFeedback = await this.prisma.feedback.create({ data: body })
        return {
            tip: '创建成功',
            feedback: createdFeedback
        }
    }

    // 分页查询
    async findPage(body: FindPageFeedbackRequestDto): Promise<FindPageFeedbackResponseDto> {
        const { page, pageSize, ...other } = body
        const filters = pick(other, Object.keys(new FeedbackEntity()))

        const { list, current, total } = await this.prisma.findPage<FeedbackEntity>({
            model: 'feedback',
            page,
            pageSize,
            orderBy: { createdAt: 'desc' },
            filters
        })

        return {
            list,
            pagination: {
                current,
                pageSize,
                total
            }
        }
    }

    // 详细查询
    async findOne(id: number): Promise<FindOneFeedbackResponseDto> {
        const dbFeedback = await this.prisma.findFeedbackEntity(id)
        return {
            feedback: dbFeedback
        }
    }

    // 更改
    async update(id: number, body: UpdateFeedbackRequestDto): Promise<UpdateFeedbackResponseDto> {
        const { carId, userId } = body
        await this.prisma.findFeedbackEntity(id)
        if (carId) await this.prisma.findCarEntity(carId)
        if (userId) await this.prisma.findUserEntity(userId)
        const data = pick(body, Object.keys(new FeedbackEntity()))

        const updatedFeedback = await this.prisma.feedback.update({ where: { id }, data })
        return {
            tip: '更改成功',
            feedback: updatedFeedback
        }
    }

    // 删除
    async remove(id: number) {
        await this.prisma.findFeedbackEntity(id)
        await this.prisma.feedback.delete({ where: { id } })
        return {
            tip: '删除成功'
        }
    }
}
