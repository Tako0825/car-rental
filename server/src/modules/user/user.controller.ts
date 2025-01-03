import {
    Controller,
    Get,
    Body,
    Patch,
    Param,
    Delete,
    UsePipes,
    UseGuards,
    ParseIntPipe,
    Query
} from '@nestjs/common'
import { UserService } from './user.service'
import { UpdateUserRequestDto } from './dtos/update-user.dto'
import { FindPageUserRequestDto } from './dtos/find-user.dto'
import { BodyValidationPipe } from 'src/pipes/body-validation.pipe'
import { AuthGuard } from '@nestjs/passport'
import { RoleGuard } from '../auth/role.guard'
import { RequiredRoles } from 'src/decorators/required-roles/required-roles.decorator'

@Controller('user')
@UsePipes(BodyValidationPipe)
export class UserController {
    constructor(private readonly userService: UserService) {}

    // 分页查询
    @Get()
    async findPage(@Query() query: FindPageUserRequestDto) {
        return await this.userService.findPage(query)
    }

    // 详细查询
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.userService.findOne(id)
    }

    // 更改
    @Patch(':id')
    @UseGuards(AuthGuard('jwt'))
    async update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateUserRequestDto) {
        return await this.userService.update(id, body)
    }

    // 删除
    @Delete(':id')
    @RequiredRoles('admin')
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    async remove(@Param('id', ParseIntPipe) id: number) {
        return await this.userService.remove(id)
    }
}
