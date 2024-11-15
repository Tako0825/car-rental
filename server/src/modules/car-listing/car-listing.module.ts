import { Module } from '@nestjs/common'
import { CarListingService } from './car-listing.service'
import { CarListingController } from './car-listing.controller'

@Module({
    controllers: [CarListingController],
    providers: [CarListingService]
})
export class CarListingModule {}
