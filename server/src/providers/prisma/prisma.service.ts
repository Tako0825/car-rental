import { HttpException, Injectable } from '@nestjs/common'
import { Prisma, PrismaClient } from '@prisma/client'
import {
    CarEntity,
    CarListingEntity,
    CarMaintenanceEntity,
    FeedbackEntity,
    PaymentEntity,
    RentalEntity,
    UserEntity
} from 'src/types/entities'

export type PrismaModelKeys = Exclude<keyof PrismaService, `$${string}` | `_${string}`>

@Injectable()
export class PrismaService extends PrismaClient {
    constructor() {
        super()
    }

    // 实体是否存在
    async findEntity<Entity>(
        model: PrismaModelKeys,
        where: Partial<Entity>,
        response: any
    ): Promise<Entity> {
        const entity = await (this[model] as any).findUnique({ where })
        if (entity) {
            return entity
        } else {
            throw new HttpException(response, 422)
        }
    }

    // 查询用户实体
    async findUserEntity(id: number) {
        return await this.findEntity<UserEntity>('user', { id }, { tip: '用户不存在' })
    }

    // 查询车辆实体
    async findCarEntity(id: number) {
        return await this.findEntity<CarEntity>('car', { id }, { tip: '车辆不存在' })
    }

    // 查询租赁记录实体
    async findRentalEntity(id: number) {
        return await this.findEntity<RentalEntity>('rental', { id }, { tip: '租赁记录不存在' })
    }

    // 查询支付记录实体
    async findPaymentEntity(id: number) {
        return await this.findEntity<PaymentEntity>('payment', { id }, { tip: '支付记录不存在' })
    }

    // 查询维修记录实体
    async findCarMaintenanceEntity(id: number) {
        return await this.findEntity<CarMaintenanceEntity>(
            'carMaintenance',
            { id },
            { tip: '维修记录不存在' }
        )
    }

    // 查询反馈记录实体
    async findFeedbackEntity(id: number) {
        return await this.findEntity<FeedbackEntity>('feedback', { id }, { tip: '反馈记录不存在' })
    }

    // 查询反馈记录实体
    async findCarListingEntity(id: number) {
        return await this.findEntity<CarListingEntity>('carListing', { id }, { tip: '车辆不存在' })
    }

    // 分页查询
    async findPage<Entity>(args: {
        model: PrismaModelKeys
        page: number
        pageSize: number
        orderBy?: Partial<Record<keyof Entity, Prisma.SortOrder>>
        filters?: Partial<Entity>
    }): Promise<{
        current: number
        pageSize: number
        total: number
        list: Entity[]
    }> {
        try {
            const { model, page = 1, pageSize = 10, orderBy = {}, filters = {} } = args

            const total = await (this[model] as any).count({
                where: filters
            })
            const list = await (this[model] as any).findMany({
                where: filters,
                orderBy,
                skip: (+page - 1) * +pageSize,
                take: +pageSize
            })

            return {
                current: page,
                pageSize,
                total,
                list
            }
        } catch (error) {
            throw new HttpException({ tip: '分页错误', error }, 500)
        }
    }
}
