import { RoleEnum, CarStatusEnum, RentalStatusEnum, PaymentStatusEnum } from './enums'

// 用户实体
export interface UserEntity {
    id: number
    createdAt: Date
    email: string
    password: string
    role: RoleEnum
    updatedAt: Date
    username: string
}

// 车辆实体
export interface CarEntity {
    id: number
    userId: number
    createdAt: Date
    updatedAt: Date
    licensePlate: string
    model: string
    make: string
    year: number
    status: CarStatusEnum
    batteryLevel: number
    location: string
    pricePerDay: number
}

// 租赁记录实体
export interface RentalEntity {
    id: number
    createdAt: Date
    updatedAt: Date
    userId: number
    status: RentalStatusEnum
    carId: number
    startTime: Date
    endTime: Date
    totalPrice: number
}

// 支付记录实体
export interface PaymentEntity {
    id: number
    rentalId: number
    paymentStatus: PaymentStatusEnum
    paymentDate: Date
}

// 维修记录实体
export interface CarMaintenanceEntity {
    id: number
    createdAt: Date
    updatedAt: Date
    carId: number
    maintenanceType: string
    description: string
}

// 反馈记录实体
export interface FeedbackEntity {
    id: number
    createdAt: Date
    userId: number
    carId: number
    rating: number
    comment: string
}
