import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UsePipes,
    ParseIntPipe,
    UseGuards
} from '@nestjs/common'
import { PaymentService } from './payment.service'
import { CreatePaymentRequestDto } from './dto/create-payment.dto'
import { BodyValidationPipe } from 'src/pipes/body-validation.pipe'
import { FindPagePaymentRequestDto } from './dto/find-payment.dto'
import { UpdatePaymentRequestDto } from './dto/update-payment.dto'
import { AuthGuard } from '@nestjs/passport'

@Controller('payment')
@UsePipes(BodyValidationPipe)
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

    // 创建
    @Post()
    async create(@Body() body: CreatePaymentRequestDto) {
        return await this.paymentService.create(body)
    }

    // 分页查询
    @Get()
    async findPage(@Body() body: FindPagePaymentRequestDto) {
        return await this.paymentService.findPage(body)
    }

    // 详细查询
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.paymentService.findOne(id)
    }

    // 更改
    @Patch(':id')
    @UseGuards(AuthGuard('jwt'))
    async update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdatePaymentRequestDto) {
        return await this.paymentService.update(id, body)
    }

    // 删除
    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    async remove(@Param('id', ParseIntPipe) id: number) {
        return await this.paymentService.remove(id)
    }
}
