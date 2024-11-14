import { http } from '@renderer/utils/http'
import { UserEntity } from '../types/entities'

export interface LoginRequestDto extends Partial<UserEntity> {
    email: string
    password: string
}

export interface LoginResponseDto {
    tip: string
    token: string
}

export class RegisterRequestDto implements Partial<UserEntity> {
    email: string = ''
    password: string = ''
    username: string = ''
}

export interface RegisterResponseDto {
    tip: string
    token: string
    user: Omit<UserEntity, 'password' | 'email'>
}

export default {
    // 注册
    register: async (body: RegisterRequestDto) =>
        await http<RegisterRequestDto, RegisterResponseDto>({
            method: 'post',
            url: '/auth/register',
            body
        }),

    // 登录
    login: async (body: LoginRequestDto) =>
        await http<LoginRequestDto, LoginResponseDto>({
            method: 'post',
            url: '/auth/login',
            body
        }),

    // 自动登录
    autoLogin: async () => {
        await http<object, LoginResponseDto>({
            method: 'get',
            url: '/auth/login'
        })
    }
}
