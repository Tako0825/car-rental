import { $Enums } from '@prisma/client'
import { PaymentEntity } from 'src/types/entities'
import { PaginationRequest, PaginationResponse } from 'src/types/pagination'

export class FindPagePaymentRequestDto extends PaginationRequest implements Partial<PaymentEntity> {
    id?: number
    rentalId?: number
    paymentStatus?: $Enums.PaymentStatus
    paymentDate?: Date
}

export class FindPagePaymentResponseDto extends PaginationResponse {
    list: PaymentEntity[]
}

export class FindOnePaymentResponseDto {
    payment: PaymentEntity
}
