import { IsOptional } from 'class-validator'
import { CreatePaymentRequestDto } from './create-payment.dto'
import { $Enums } from '@prisma/client'

export class UpdatePaymentRequestDto implements Partial<CreatePaymentRequestDto> {
    @IsOptional()
    paymentStatus?: $Enums.PaymentStatus
    @IsOptional()
    paymentDate?: Date
}

export class UpdatePaymentResponseDto {}
