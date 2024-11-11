import { IsNotEmpty, IsNumber } from 'class-validator'

export class PaginationRequest {
    @IsNotEmpty({ message: '缺乏当前页' })
    @IsNumber({}, { message: '非数字类型' })
    page: number
    @IsNotEmpty({ message: '缺乏每页显示的记录数' })
    @IsNumber({}, { message: '非数字类型' })
    pageSize: number
}

export class PaginationResponse {
    page: number
    pageSize: number
    totalCount: number
    totalPages: number
}
