import { Module } from '@nestjs/common'
import { RentalService } from './rental.service'
import { RentalController } from './rental.controller'
import { CarService } from '../car/car.service'
import { UserService } from '../user/user.service'

@Module({
    controllers: [RentalController],
    providers: [RentalService, CarService, UserService]
})
export class RentalModule {}
