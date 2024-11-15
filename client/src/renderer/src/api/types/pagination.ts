export interface PaginationRequest {
    page: number
    pageSize: number
}

export interface PaginationResponse {
    pagination: {
        current: number
        pageSize: number
        total: number
    }
}
