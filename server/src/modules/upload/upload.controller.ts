import { Controller, Get, UseGuards } from '@nestjs/common'
import { UploadService } from './upload.service'
import { AuthGuard } from '@nestjs/passport'

@Controller('upload')
export class UploadController {
    constructor(private readonly uploadService: UploadService) {}

    // 获取上传凭据
    @Get('')
    @UseGuards(AuthGuard('jwt'))
    getUploadToken() {
        return this.uploadService.getUploadToken()
    }
}
