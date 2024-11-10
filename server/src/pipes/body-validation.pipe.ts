import {
    HttpException,
    HttpStatus,
    Injectable,
    ValidationError,
    ValidationPipe
} from '@nestjs/common'

// 校验请求体
@Injectable()
export class BodyValidationPipe extends ValidationPipe {
    protected flattenValidationErrors(
        validationErrors: ValidationError[]
    ): string[] {
        const error = new Object()
        validationErrors.forEach(item => {
            error[item.property] = Object.values(item.constraints)
        })
        throw new HttpException(
            error,
            HttpStatus.UNPROCESSABLE_ENTITY // 422
        )
    }
}
