import { IsNotEmpty } from 'class-validator'

export class PaginationRequest {
    @IsNotEmpty({ message: '缺乏当前页' })
    page: number
    @IsNotEmpty({ message: '缺乏每页显示的记录数' })
    pageSize: number
}

export class PaginationResponse {
    pagination: {
        current: number
        pageSize: number
        total: number
    }
}
