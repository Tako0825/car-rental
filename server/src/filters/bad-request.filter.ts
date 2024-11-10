import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus
} from '@nestjs/common'
import { Response } from 'express'

// 异常过滤器
@Catch(HttpException)
export class BadRequestFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()

        const statusCode =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR
        const withoutResponseStatus = [400, 401, 403]
        response.status(statusCode).json(
            withoutResponseStatus.includes(statusCode)
                ? exception.getResponse()
                : {
                      message: HttpStatus[statusCode],
                      statusCode,
                      data: withoutResponseStatus.includes(statusCode)
                          ? undefined
                          : exception.getResponse()
                  }
        )
    }
}
