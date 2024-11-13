import { Injectable } from '@nestjs/common'
import { auth, rs } from 'qiniu'

@Injectable()
export class UploadService {
    private readonly accessKey: string = process.env.QINIU_ACCESS_KEY

    private readonly secretKey: string = process.env.QINIU_SECRET_KEY

    private readonly scopeName: string = process.env.QINIU_SCOPE_NAME

    private readonly mac = new auth.digest.Mac(this.accessKey, this.secretKey)

    private readonly options = { scope: this.scopeName }

    // 获取上传凭据
    getUploadToken() {
        const putPolicy = new rs.PutPolicy(this.options)
        const uploadToken = putPolicy.uploadToken(this.mac)
        return {
            uploadToken
        }
    }
}
