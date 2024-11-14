import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
    UseGuards,
    UsePipes
} from '@nestjs/common'
import { FeedbackService } from './feedback.service'
import { AuthGuard } from '@nestjs/passport'
import { BodyValidationPipe } from 'src/pipes/body-validation.pipe'
import { CreateFeedbackRequestDto } from './dtos/create-feedback.dto'
import { FindPageFeedbackRequestDto } from './dtos/find-feedback.dto'
import { UpdateFeedbackRequestDto } from './dtos/update-feedback.dto'

@Controller('feedback')
@UsePipes(BodyValidationPipe)
export class FeedbackController {
    constructor(private readonly feedbackService: FeedbackService) {}

    // 创建
    @Post()
    @UseGuards(AuthGuard('jwt'))
    async create(@Body() body: CreateFeedbackRequestDto) {
        return await this.feedbackService.create(body)
    }

    // 分页查询
    @Get()
    async findPage(@Body() body: FindPageFeedbackRequestDto) {
        return await this.feedbackService.findPage(body)
    }

    // 详细查询
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.feedbackService.findOne(id)
    }

    // 更改
    @Patch(':id')
    @UseGuards(AuthGuard('jwt'))
    async update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateFeedbackRequestDto) {
        return await this.feedbackService.update(id, body)
    }

    // 删除
    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    async remove(@Param('id', ParseIntPipe) id: number) {
        return await this.feedbackService.remove(id)
    }
}
