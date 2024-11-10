import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/providers/prisma/prisma.service'
import { LoginRequestDto, LoginResponseDto } from './dtos/login.dto'
import { JwtService } from '@nestjs/jwt'
import { RegisterRequestDto, RegisterResponseDto } from './dtos/regiter.dto'
import { createHash } from 'crypto'
import { User } from '@prisma/client'
import { omit } from 'lodash'

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwt: JwtService
    ) {}

    // 登录
    async login(body: LoginRequestDto): Promise<LoginResponseDto> {
        const { email, password } = body
        const dbUser = await this.prisma.user.findUnique({ where: { email } })
        if (!dbUser)
            throw new HttpException(
                { tip: '邮箱未注册' },
                HttpStatus.UNPROCESSABLE_ENTITY // 422
            )
        const passwordHash = createHash('sha256').update(password).digest('hex')
        if (passwordHash !== dbUser.password)
            throw new HttpException(
                { tip: '密码错误' },
                HttpStatus.UNPROCESSABLE_ENTITY // 422
            )

        return {
            tip: '登录成功',
            token: await this.jwt.signAsync({
                payload: { email },
                sign: process.env.SECRET_OR_KEY
            })
        }
    }

    // 注册
    async register(body: RegisterRequestDto): Promise<RegisterResponseDto> {
        const { email, password } = body
        const dbUser = await this.prisma.user.findUnique({ where: { email } })
        if (dbUser) {
            throw new HttpException(
                { tip: '邮箱已注册' },
                HttpStatus.UNPROCESSABLE_ENTITY // 422
            )
        }
        const passwordHash = createHash('sha256').update(password).digest('hex')
        const createdUser: User = await this.prisma.user.create({
            data: Object.assign(body, { password: passwordHash })
        })

        return {
            tip: '注册成功',
            token: await this.jwt.signAsync({
                payload: { email },
                sign: process.env.SECRET_OR_KEY
            }),
            user: omit(createdUser, ['password']) // 过滤密码
        }
    }

    // 自动登录
    async autoLogin(user: User) {
        delete user.password
        return {
            user
        }
    }
}
