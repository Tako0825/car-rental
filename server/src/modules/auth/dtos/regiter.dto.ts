import { IsEmail, IsNotEmpty } from 'class-validator'
import { UserEntity } from 'src/types/entities'

export class RegisterRequestDto implements Partial<UserEntity> {
    @IsNotEmpty({ message: '请输入邮箱' })
    @IsEmail({}, { message: '邮箱格式错误' })
    email: string
    @IsNotEmpty({ message: '请输入密码' })
    password: string
    @IsNotEmpty({ message: '请输入用户名' })
    username: string
}

export class RegisterResponseDto {
    tip: string
    token: string
    user: Omit<UserEntity, 'password' | 'email'>
}
