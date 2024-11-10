import {
    CallHandler,
    ExecutionContext,
    HttpStatus,
    Injectable,
    NestInterceptor
} from '@nestjs/common'
import { Observable, map } from 'rxjs'

// 响应拦截器
@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const statusCode = context.getArgs()[0].res.statusCode
        return next.handle().pipe(
            map(response => ({
                message: HttpStatus[statusCode],
                statusCode,
                data: response
            }))
        )
    }
}
