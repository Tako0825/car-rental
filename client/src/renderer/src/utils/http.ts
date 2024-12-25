import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { message } from 'antd'

export interface SuccessResponse<T> {
    statusCode: number
    message: string
    data: T
}

export interface ErrorResponse<T> {
    statusCode: number
    message: string
    data?: T
}

const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImVtYWlsIjoiMjA2MDM2NDkyMkBxcS5jb20ifSwic2lnbiI6ImNhci1yZW50YWwiLCJpYXQiOjE3MzE3NjcxNTUsImV4cCI6MTczNDM1OTE1NX0.fAM_lpQyjJC9WOGdwWiR9M0-sByTrT02bYpw6YdC8-M'

class HttpHandler {
    private readonly timeout: number = 10000
    private readonly baseURL: string = import.meta.env.VITE_API_URL ?? ''
    private readonly instance: AxiosInstance

    constructor() {
        this.instance = axios.create({
            baseURL: this.baseURL,
            timeout: this.timeout,
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        })
        this.instance.interceptors.response.use(
            this.handleResponseSuccess,
            this.handleResponseError
        )
    }

    // 响应成功拦截器
    private handleResponseSuccess<T>(response: AxiosResponse<SuccessResponse<T>>): T {
        const data = response.data.data
        if (data['tip']) {
            message.success(data['tip'])
        }
        return response.data.data
    }

    // 响应失败拦截器
    private handleResponseError<T>(error: AxiosError<ErrorResponse<T>>): T | void {
        if (error.response) {
            if (error.response.data) {
                if (error.response.data.data) {
                    const tip = error.response.data.data['tip']
                    if (tip) {
                        message.error(tip)
                    }
                    return error.response.data.data
                }
            }
        }
    }

    // Params 转换为 QueryString
    parseParamsToURL(baseURL: string, params: object): string {
        if (Object.keys(params).length < 1) {
            return baseURL
        }
        const querys: string[] = []
        for (const key in params) {
            const value = params[key]
            const query = [key, value].join('=')
            querys.push(query)
        }
        const queryString = querys.join('&')
        const url = baseURL + '?' + queryString
        return url
    }

    // 通用请求方法
    async http<RequestDto extends object, ResponseDto extends object>(args: {
        method: 'get' | 'post' | 'patch' | 'delete'
        url: string
        body?: RequestDto
        params?: RequestDto
        config?: AxiosRequestConfig
    }): Promise<ResponseDto> {
        const { method, body = {}, params = {}, config = {} } = args
        const url = this.parseParamsToURL(args.url, params)

        switch (method) {
            case 'get':
                return await this.instance.get(url, config)
            case 'post':
                return await this.instance.post(url, body, config)
            case 'patch':
                return await this.instance.patch(url, body, config)
            case 'delete':
                return await this.instance.delete(url, config)
        }
    }
}

const httpHandler = new HttpHandler()

export const http = httpHandler.http.bind(httpHandler)
