import { $Enums } from '@prisma/client'
import { IsDateString, IsEnum, IsNotEmpty, IsNumber } from 'class-validator'
import { PaymentEntity } from 'src/types/entities'

export class CreatePaymentRequestDto implements Partial<PaymentEntity> {
    @IsNotEmpty({ message: '缺乏租赁记录' })
    @IsNumber({}, { message: '非数字类型' })
    rentalId: number
    @IsNotEmpty({ message: '缺乏状态' })
    @IsEnum($Enums.PaymentStatus, { message: '状态错误' })
    paymentStatus: $Enums.PaymentStatus
    @IsNotEmpty({ message: '缺乏支付时间' })
    @IsDateString({}, { message: '时间格式错误' })
    paymentDate: Date
}

export class CreatePaymentResponseDto {
    tip: string
    payment: PaymentEntity
}
