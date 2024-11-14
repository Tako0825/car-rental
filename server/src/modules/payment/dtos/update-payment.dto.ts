import { IsOptional } from 'class-validator'
import { CreatePaymentRequestDto } from './create-payment.dto'
import { $Enums } from '@prisma/client'
import { PaymentEntity } from '../../../types/entities'

export class UpdatePaymentRequestDto implements Partial<CreatePaymentRequestDto> {
    @IsOptional()
    paymentStatus?: $Enums.PaymentStatus
    @IsOptional()
    paymentDate?: Date
}

export class UpdatePaymentResponseDto {
    tip: string
    payment: PaymentEntity
}
