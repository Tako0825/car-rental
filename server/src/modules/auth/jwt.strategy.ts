import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { PrismaService } from 'src/providers/prisma/prisma.service'

// 身份验证策略
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private readonly prisma: PrismaService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.SECRET_OR_KEY
        })
    }

    async validate({ payload }): Promise<any> {
        return await this.prisma.user.findUnique({
            where: { email: payload.email }
        })
    }
}
