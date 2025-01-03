import {
    $Enums,
    Car,
    CarListing,
    CarMaintenance,
    Feedback,
    Payment,
    Rental,
    User
} from '@prisma/client'

export class UserEntity implements User {
    id: number = 0
    createdAt: Date = new Date()
    email: string = ''
    password: string = ''
    role: $Enums.Role = 'user'
    updatedAt: Date = new Date()
    username: string = ''
    avatar: string = ''
}

export class CarEntity implements Car {
    id: number = 0
    createdAt: Date = new Date()
    updatedAt: Date = new Date()
    model: string = ''
    make: string = ''
    cover: string = ''
}

export class CarListingEntity implements CarListing {
    id: number = 0
    createdAt: Date = new Date()
    updatedAt: Date = new Date()
    userId: number = 0
    carId: number = 0
    licensePlate: string = ''
    year: number = 0
    status: $Enums.CarStatus = 'available'
    batteryLevel: number = 0
    location: string = ''
    pricePerDay: number = 0
}

export class RentalEntity implements Rental {
    id: number = 0
    createdAt: Date = new Date()
    updatedAt: Date = new Date()
    userId: number = 0
    carListingId: number = 0
    startTime: Date = new Date()
    endTime: Date = new Date()
    totalPrice: number = 0
    status: $Enums.RentalStatus = 'active'
}

export class PaymentEntity implements Payment {
    id: number = 0
    rentalId: number = 0
    paymentStatus: $Enums.PaymentStatus = 'pending'
    paymentDate: Date = new Date()
}

export class CarMaintenanceEntity implements CarMaintenance {
    id: number = 0
    createdAt: Date = new Date()
    updatedAt: Date = new Date()
    carListingId: number = 0
    maintenanceType: string = ''
    description: string = ''
}

export class FeedbackEntity implements Feedback {
    id: number = 0
    createdAt: Date = new Date()
    userId: number = 0
    carListingId: number = 0
    rating: number = 0
    comment: string = ''
}
