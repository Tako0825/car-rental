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
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImVtYWlsIjoiZWxlY3Ryb24wMTE3QGdtYWlsLmNvbSJ9LCJzaWduIjoiY2FyLXJlbnRhbCIsImlhdCI6MTczMTQxMDc5OSwiZXhwIjoxNzM0MDAyNzk5fQ.2AUGysX-ril6qI51yeiDdLM9W90jgsn_Djw4mC3c__8'

class HttpHandler {
    private readonly timeout: number = 10000
    private readonly baseURL: string = process.env.VITE_API_URL || ''
    private readonly instance: AxiosInstance

    constructor() {
        this.instance = axios.create({
            baseURL: this.baseURL,
            timeout: this.timeout,
            headers: {
                Authorization: token,
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
    private parseURL(baseURL: string, params: object): string {
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
        const url = this.parseURL(args.url, params)

        switch (method) {
            case 'get':
                return this.instance.get(url, config)
            case 'post':
                return this.instance.post(url, body, config)
            case 'patch':
                return this.instance.patch(url, body, config)
            case 'delete':
                return this.instance.delete(url, config)
        }
    }
}

export const { http } = new HttpHandler()
