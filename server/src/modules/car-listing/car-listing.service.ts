import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/providers/prisma/prisma.service'
import {
    CreateCarListingRequestDto,
    CreateCarListingResponseDto
} from './dto/create-car-listing.dto'
import {
    FindOneCarListingResponseDto,
    FindPageCarListingRequestDto,
    FindPageCarListingResponseDto
} from './dto/find-car-listing.dto'
import { CarListingEntity } from 'src/types/entities'
import { pick } from 'lodash'
import {
    UpdateCarListingRequestDto,
    UpdateCarListingResponseDto
} from './dto/update-car-listing.dto'

@Injectable()
export class CarListingService {
    constructor(private readonly prisma: PrismaService) {}

    // 创建
    async create(body: CreateCarListingRequestDto): Promise<CreateCarListingResponseDto> {
        const createdCarListing = await this.prisma.carListing.create({ data: body })
        return {
            tip: '创建成功',
            carListing: createdCarListing
        }
    }

    // 分页查询
    async findPage(body: FindPageCarListingRequestDto): Promise<FindPageCarListingResponseDto> {
        const { page, pageSize, ...other } = body
        const filters = pick(other, Object.keys(new CarListingEntity()))

        const { list, current, total } = await this.prisma.findPage<CarListingEntity>({
            model: 'carListing',
            page,
            pageSize,
            orderBy: { updatedAt: 'desc' },
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
    async findOne(id: number): Promise<FindOneCarListingResponseDto> {
        const dbCarListing = await this.prisma.findEntity<CarListingEntity>(
            'carListing',
            { id },
            { tip: '车辆不存在' }
        )
        return {
            carListing: dbCarListing
        }
    }

    // 更改
    async update(
        id: number,
        body: UpdateCarListingRequestDto
    ): Promise<UpdateCarListingResponseDto> {
        await this.prisma.findEntity<CarListingEntity>('carListing', { id }, { tip: '车辆不存在' })
        const updatedCarListing = await this.prisma.carListing.update({
            where: { id },
            data: body
        })

        return {
            tip: '更改成功',
            carListing: updatedCarListing
        }
    }

    // 删除
    async remove(id: number) {
        await this.prisma.findEntity<CarListingEntity>('carListing', { id }, { tip: '车辆不存在' })
        await this.prisma.$transaction(async () => {
            const carListingId = id
            const dbRentals = await this.prisma.rental.findMany({ where: { carListingId } })
            const rentalsIds = dbRentals.map(rental => rental.id)
            await this.prisma.payment.deleteMany({ where: { rentalId: { in: rentalsIds } } })
            await Promise.all([
                this.prisma.rental.deleteMany({ where: { carListingId } }),
                this.prisma.feedback.deleteMany({ where: { carListingId } }),
                this.prisma.carMaintenance.deleteMany({ where: { carListingId } })
            ])
            await this.prisma.carListing.delete({ where: { id } })
        })

        return {
            tip: '删除成功'
        }
    }
}
