import { Module } from '@nestjs/common'
import { AuthModule } from './modules/auth/auth.module'
import { PrismaModule } from './providers/prisma/prisma.module'
import { JwtStrategy } from './modules/auth/jwt.strategy'
import { JwtModule } from '@nestjs/jwt'
import { PrismaService } from './providers/prisma/prisma.service'
import { UserModule } from './modules/user/user.module'
import { CarModule } from './modules/car/car.module'
import { RentalModule } from './modules/rental/rental.module'

@Module({
    imports: [
        JwtModule.registerAsync({
            global: true,
            useFactory: () => {
                return {
                    secret: process.env.SECRET_OR_KEY,
                    signOptions: { expiresIn: '30d' }
                }
            }
        }),
        AuthModule,
        PrismaModule,
        UserModule,
        CarModule,
        RentalModule
    ],
    controllers: [],
    providers: [JwtStrategy, PrismaService]
})
export class AppModule {}
