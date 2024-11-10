import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ResponseInterceptor } from './interceptors/response.interceptor'
import { BadRequestFilter } from './filters/bad-request.filter'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.setGlobalPrefix('/api')
    app.useGlobalInterceptors(new ResponseInterceptor())
    app.useGlobalFilters(new BadRequestFilter())
    await app.listen(4000)
}
bootstrap()
