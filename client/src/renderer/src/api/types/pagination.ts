export interface PaginationRequest {
    page: number
    pageSize: number
}

export interface PaginationResponse {
    page: number
    pageSize: number
    totalCount: number
    totalPages: number
}
