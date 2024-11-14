import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UsePipes,
    UseGuards,
    ParseIntPipe
} from '@nestjs/common'
import { CarMaintenanceService } from './car-maintenance.service'
import { CreateCarMaintenanceRequestDto } from './dtos/create-car-maintenance.dto'
import { UpdateCarMaintenanceRequestDto } from './dtos/update-car-maintenance.dto'
import { BodyValidationPipe } from 'src/pipes/body-validation.pipe'
import { AuthGuard } from '@nestjs/passport'
import { FindPageCarMaintenanceRequestDto } from './dtos/find-car-maintenance.dto'

@Controller('car-maintenance')
@UsePipes(BodyValidationPipe)
export class CarMaintenanceController {
    constructor(private readonly carMaintenanceService: CarMaintenanceService) {}

    // 创建
    @Post()
    @UseGuards(AuthGuard('jwt'))
    async create(@Body() body: CreateCarMaintenanceRequestDto) {
        return await this.carMaintenanceService.create(body)
    }

    // 分页查询
    @Get()
    async findPage(@Body() body: FindPageCarMaintenanceRequestDto) {
        return await this.carMaintenanceService.findPage(body)
    }

    // 详细查询
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.carMaintenanceService.findOne(id)
    }

    // 更改
    @Patch(':id')
    @UseGuards(AuthGuard('jwt'))
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: UpdateCarMaintenanceRequestDto
    ) {
        return await this.carMaintenanceService.update(id, body)
    }

    // 删除
    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.carMaintenanceService.remove(id)
    }
}
