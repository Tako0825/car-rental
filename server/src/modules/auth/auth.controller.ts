import { Body, Controller, Post, UsePipes, UseGuards, Get, Req, Request } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginRequestDto } from './dtos/login.dto'
import { BodyValidationPipe } from 'src/pipes/body-validation.pipe'
import { RegisterRequestDto } from './dtos/regiter.dto'
import { AuthGuard } from '@nestjs/passport'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    // 登录
    @Post('login')
    @UsePipes(BodyValidationPipe)
    async login(@Body() body: LoginRequestDto) {
        return await this.authService.login(body)
    }

    // 注册
    @Post('register')
    @UsePipes(BodyValidationPipe)
    async register(@Body() body: RegisterRequestDto) {
        return await this.authService.register(body)
    }

    // 自动登录
    @Get('login')
    @UseGuards(AuthGuard('jwt'))
    async autoLogin(@Req() req: Request) {
        return await this.authService.autoLogin(req['user'])
    }
}
