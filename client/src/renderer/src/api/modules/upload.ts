import { http } from '@renderer/utils/http'

export interface GetUploadTokenResponseDto {
    uploadToken: string
}

export default {
    // 获取上传凭据
    getUploadToken: async () =>
        await http<object, GetUploadTokenResponseDto>({
            method: 'get',
            url: '/upload'
        })
}
