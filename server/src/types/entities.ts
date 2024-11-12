import { $Enums, Car, Payment, Rental, User } from '@prisma/client'

export class UserEntity implements User {
    id: number = 0
    createdAt: Date = new Date()
    email: string = ''
    password: string = ''
    role: $Enums.Role = 'user'
    updatedAt: Date = new Date()
    username: string = ''
}

export class CarEntity implements Car {
    id: number = 0
    userId: number = 0
    createdAt: Date = new Date()
    updatedAt: Date = new Date()
    licensePlate: string = ''
    model: string = ''
    make: string = ''
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
    status: $Enums.RentalStatus = 'active'
    carId: number = 0
    startTime: Date = new Date()
    endTime: Date = new Date()
    totalPrice: number = 0
}

export class PaymentEntity implements Payment {
    id: number = 0
    rentalId: number = 0
    paymentStatus: $Enums.PaymentStatus = 'pending'
    paymentDate: Date = new Date()
}
