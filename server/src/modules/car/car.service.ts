import { HttpException, Injectable } from '@nestjs/common'
import { pick } from 'lodash'
import { CarEntity } from 'src/types/entities'
import { PrismaService } from 'src/providers/prisma/prisma.service'
import {
    FindManyCarRequestDto,
    FindManyCarResponseDto,
    FindOneCarResponseDto
} from './dtos/find-car.dto'
import { UpdateCarRequestDto, UpdateCarResponseDto } from './dtos/update-car.dto'
import { CreateCarRequestDto, CreateCarResponseDto } from './dtos/create-car.dto'

@Injectable()
export class CarService {
    constructor(private readonly prisma: PrismaService) {}

    // 创建
    async create(body: CreateCarRequestDto): Promise<CreateCarResponseDto> {
        const dbCar = await this.prisma.car.findUnique({
            where: { licensePlate: body.licensePlate }
        })
        if (dbCar) throw new HttpException({ tip: '牌号已存在' }, 422)

        const createdCar = await this.prisma.car.create({ data: body })
        return {
            tip: '创建成功',
            car: createdCar
        }
    }

    // 分页查询
    async findPage(body: FindManyCarRequestDto): Promise<FindManyCarResponseDto> {
        const { page, pageSize, ...other } = body
        const filters = pick(other, Object.keys(new CarEntity()))

        const { list, totalCount, totalPages } = await this.prisma.findPage<CarEntity>({
            model: 'car',
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
    async findOne(id: number): Promise<FindOneCarResponseDto> {
        const dbCar = await this.prisma.findEntity<CarEntity>('car', { id }, { tip: '车辆不存在' })
        return {
            car: dbCar
        }
    }

    // 更改
    async update(id: number, body: UpdateCarRequestDto): Promise<UpdateCarResponseDto> {
        await this.prisma.findEntity<CarEntity>('car', { id }, { tip: '车辆不存在' })
        const updatedCar = await this.prisma.car.update({
            where: { id },
            data: body
        })

        return {
            tip: '更改成功',
            car: updatedCar
        }
    }

    // 删除
    async remove(id: number) {
        await this.prisma.findEntity<CarEntity>('car', { id }, { tip: '车辆不存在' })
        const carId = id
        const dbCar = await this.prisma.car.findUnique({
            where: { id },
            select: { rentals: true }
        })
        const rentalIds = dbCar.rentals.map(rental => rental.id)

        await this.prisma.$transaction(async () => {
            await this.prisma.payment.deleteMany({
                where: { rentalId: { in: rentalIds } }
            })
            await Promise.all([
                this.prisma.rental.deleteMany({ where: { carId } }),
                this.prisma.feedback.deleteMany({ where: { carId } }),
                this.prisma.carMaintenance.deleteMany({ where: { carId } })
            ])
            await this.prisma.car.delete({ where: { id } })
        })

        return {
            tip: '删除成功'
        }
    }
}
