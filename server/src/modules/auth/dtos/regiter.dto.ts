import { User } from '@prisma/client'
import { IsEmail, IsNotEmpty } from 'class-validator'

export class RegisterRequestDto implements Partial<User> {
    @IsNotEmpty({ message: '请输入邮箱' })
    @IsEmail({}, { message: '邮箱格式不正确' })
    email: string
    @IsNotEmpty({ message: '请输入密码' })
    password: string
    @IsNotEmpty({ message: '请输入用户名' })
    username: string
}

export class RegisterResponseDto {
    tip: string
    token: string
    user: Omit<User, 'password'>
}
