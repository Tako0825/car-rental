import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UsePipes,
    Req,
    UseGuards,
    ParseIntPipe
} from '@nestjs/common'
import { RentalService } from './rental.service'
import { CreateRentalRequestDto } from './dto/create-rental.dto'
import { UpdateRentalRequestDto } from './dto/update-rental.dto'
import { BodyValidationPipe } from 'src/pipes/body-validation.pipe'
import { AuthGuard } from '@nestjs/passport'
import { FindPageRentalRequestDto } from './dto/find-rental.dto'
import { CarService } from '../car/car.service'
import { UserService } from '../user/user.service'

@Controller('rental')
@UsePipes(BodyValidationPipe)
export class RentalController {
    constructor(
        private readonly rentalService: RentalService,
        private readonly carService: CarService,
        private readonly userService: UserService
    ) {}

    // 创建
    @Post()
    @UseGuards(AuthGuard('jwt'))
    async create(@Req() req: Request, @Body() body: CreateRentalRequestDto) {
        await this.userService.findOne(body.userId)
        await this.carService.findOne(body.carId)
        return await this.rentalService.create(body, +req['user']['id'])
    }

    // 分页查询
    @Get()
    async findPage(@Body() body: FindPageRentalRequestDto) {
        return await this.rentalService.findPage(body)
    }

    // 详细查询
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.rentalService.findOne(id)
    }

    // 更改
    @Patch(':id')
    @UseGuards(AuthGuard('jwt'))
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: UpdateRentalRequestDto
    ) {
        if (id) await this.rentalService.findOne(id)
        if (body.userId) await this.userService.findOne(body.userId)
        if (body.carId) await this.carService.findOne(body.carId)
        return this.rentalService.update(id, body)
    }

    // 删除
    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    async remove(@Param('id', ParseIntPipe) id: number) {
        await this.rentalService.findOne(id)
        return this.rentalService.remove(+id)
    }
}
