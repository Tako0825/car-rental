import { UserEntity } from 'src/types/entities'
import { $Enums } from '@prisma/client'
import { IsEmail, IsEnum, IsOptional, MaxLength } from 'class-validator'

export class UpdateUserRequestDto {
    @IsOptional()
    @IsEmail({}, { message: '邮箱格式不正确' })
    email?: string | undefined
    password?: string
    @IsOptional()
    @IsEnum($Enums.Role, { message: '角色错误' })
    role?: $Enums.Role
    @IsOptional()
    @MaxLength(10, { message: '用户名最长不得超过 10 个字符' })
    username?: string
}

export class UpdateUserResponseDto {
    tip: string
    user: Omit<UserEntity, 'password' | 'email'>
}
