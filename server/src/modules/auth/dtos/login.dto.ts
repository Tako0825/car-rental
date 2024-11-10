import { IsEmail, IsNotEmpty } from 'class-validator'
import { User } from '@prisma/client'

export class LoginRequestDto implements Partial<User> {
    @IsNotEmpty({ message: '请输入邮箱' })
    @IsEmail({}, { message: '邮箱格式不正确' })
    email: string
    @IsNotEmpty({ message: '请输入密码' })
    password: string
}

export class LoginResponseDto {
    tip: string
    token: string
}
