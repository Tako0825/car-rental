import { Module } from '@nestjs/common'
import { RentalService } from './rental.service'
import { RentalController } from './rental.controller'
import { CarService } from '../car/car.service'
import { UserService } from '../user/user.service'
import { AuthModule } from '../auth/auth.module'

@Module({
    imports: [AuthModule],
    controllers: [RentalController],
    providers: [RentalService, CarService, UserService]
})
export class RentalModule {}
