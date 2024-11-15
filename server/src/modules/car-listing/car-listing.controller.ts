import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
    UseGuards
} from '@nestjs/common'
import { CreateCarListingRequestDto } from './dto/create-car-listing.dto'
import { FindPageCarListingRequestDto } from './dto/find-car-listing.dto'
import { UpdateCarListingRequestDto } from './dto/update-car-listing.dto'
import { AuthGuard } from '@nestjs/passport'
import { RequiredRoles } from 'src/decorators/required-roles/required-roles.decorator'
import { RoleGuard } from '../auth/role.guard'
import { CarListingService } from './car-listing.service'

@Controller('car-listing')
export class CarListingController {
    constructor(private readonly carListingService: CarListingService) {}

    // 创建
    @Post()
    @UseGuards(AuthGuard('jwt'))
    async create(@Body() body: CreateCarListingRequestDto) {
        return await this.carListingService.create(body)
    }

    // 分页查询
    @Get()
    async findPage(@Body() body: FindPageCarListingRequestDto) {
        return await this.carListingService.findPage(body)
    }

    // 详细查询
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.carListingService.findOne(id)
    }

    // 更改
    @Patch(':id')
    @UseGuards(AuthGuard('jwt'))
    async update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateCarListingRequestDto) {
        return await this.carListingService.update(id, body)
    }

    // 删除
    @Delete(':id')
    @RequiredRoles('admin')
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    async remove(@Param('id', ParseIntPipe) id: number) {
        return await this.carListingService.remove(id)
    }
}
