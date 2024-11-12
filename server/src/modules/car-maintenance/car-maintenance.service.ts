import { Injectable } from '@nestjs/common'
import {
    CreateCarMaintenanceRequestDto,
    CreateCarMaintenanceResponseDto
} from './dto/create-car-maintenance.dto'
import { PrismaService } from 'src/providers/prisma/prisma.service'
import {
    FindOneCarMaintenanceResponseDto,
    FindPageCarMaintenanceRequestDto,
    FindPageCarMaintenanceResponseDto
} from './dto/find-car-maintenance.dto'
import { CarMaintenanceEntity } from 'src/types/entities'
import { pick } from 'lodash'
import {
    UpdateCarMaintenanceRequestDto,
    UpdateCarMaintenanceResponseDto
} from './dto/update-car-maintenance.dto'

@Injectable()
export class CarMaintenanceService {
    constructor(private readonly prisma: PrismaService) {}

    // 创建
    async create(body: CreateCarMaintenanceRequestDto): Promise<CreateCarMaintenanceResponseDto> {
        await this.prisma.findCarEntity(body.carId)
        const createdCarMaintenance = await this.prisma.carMaintenance.create({ data: body })
        return {
            tip: '创建成功',
            carMaintenance: createdCarMaintenance
        }
    }

    // 分页查询
    async findPage(
        body: FindPageCarMaintenanceRequestDto
    ): Promise<FindPageCarMaintenanceResponseDto> {
        const { page, pageSize, ...other } = body
        const filters = pick(other, Object.keys(new CarMaintenanceEntity()))

        const { list, totalCount, totalPages } = await this.prisma.findPage<CarMaintenanceEntity>({
            model: 'carMaintenance',
            orderBy: { updatedAt: 'desc' },
            filters
        })

        return {
            page,
            pageSize,
            totalCount,
            totalPages,
            list
        }
    }

    // 详细查询
    async findOne(id: number): Promise<FindOneCarMaintenanceResponseDto> {
        const dbCarMaintenance = await this.prisma.findCarMaintenanceEntity(id)
        return {
            carMaintenance: dbCarMaintenance
        }
    }

    // 更改
    async update(
        id: number,
        body: UpdateCarMaintenanceRequestDto
    ): Promise<UpdateCarMaintenanceResponseDto> {
        await this.prisma.findCarMaintenanceEntity(id)
        const data = pick(body, Object.keys(new CarMaintenanceEntity()))

        const updatedCarMaintenance = await this.prisma.carMaintenance.update({
            where: { id },
            data
        })
        return {
            tip: '更改成功',
            carMaintenance: updatedCarMaintenance
        }
    }

    // 删除
    async remove(id: number) {
        await this.prisma.findCarMaintenanceEntity(id)
        await this.prisma.carMaintenance.delete({ where: { id } })
        return {
            tip: '删除成功'
        }
    }
}
