import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    UsePipes,
    ParseIntPipe
} from '@nestjs/common'
import { CarService } from './car.service'
import { AuthGuard } from '@nestjs/passport'
import { RequiredRoles } from 'src/decorators/required-roles/required-roles.decorator'
import { RoleGuard } from '../auth/role.guard'
import { CreateCarRequestDto } from './dtos/create-car.dto'
import { FindPageCarRequestDto } from './dtos/find-car.dto'
import { UpdateCarRequestDto } from './dtos/update-car.dto'
import { BodyValidationPipe } from 'src/pipes/body-validation.pipe'

@Controller('car')
@UsePipes(BodyValidationPipe)
export class CarController {
    constructor(private readonly carService: CarService) {}

    // 创建
    @Post()
    @UseGuards(AuthGuard('jwt'))
    async create(@Body() body: CreateCarRequestDto) {
        return await this.carService.create(body)
    }

    // 分页查询
    @Get()
    async findPage(@Body() body: FindPageCarRequestDto) {
        return await this.carService.findPage(body)
    }

    // 详细查询
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.carService.findOne(id)
    }

    // 更改
    @Patch(':id')
    @UseGuards(AuthGuard('jwt'))
    async update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateCarRequestDto) {
        return await this.carService.update(id, body)
    }

    // 删除
    @Delete(':id')
    @RequiredRoles('admin')
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    async remove(@Param('id', ParseIntPipe) id: number) {
        return await this.carService.remove(id)
    }
}
