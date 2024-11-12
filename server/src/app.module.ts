import { Module } from '@nestjs/common'
import { AuthModule } from './modules/auth/auth.module'
import { PrismaModule } from './providers/prisma/prisma.module'
import { JwtStrategy } from './modules/auth/jwt.strategy'
import { JwtModule } from '@nestjs/jwt'
import { PrismaService } from './providers/prisma/prisma.service'
import { UserModule } from './modules/user/user.module'
import { CarModule } from './modules/car/car.module'
import { RentalModule } from './modules/rental/rental.module'
import { PaymentModule } from './modules/payment/payment.module'
import { CarMaintenanceModule } from './modules/car-maintenance/car-maintenance.module'

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
        RentalModule,
        PaymentModule,
        CarMaintenanceModule
    ],
    controllers: [],
    providers: [JwtStrategy, PrismaService]
})
export class AppModule {}
