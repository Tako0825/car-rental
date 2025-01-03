import * as qiniu from 'qiniu-js'
import { v4 } from 'uuid'
import { HmacSHA1, enc } from 'crypto-js'
import { api } from '@renderer/api'

const domainName = import.meta.env.VITE_DOWNLOAD_URL // 加速域名
const accessKey = import.meta.env.VITE_ACCESS_KEY // ACCESS_KEY
const secretKey = import.meta.env.VITE_SECRET_KEY // SECRET_KEY

export type UploadFileResult = {
    downloadURL: string
    key: string
}

// 上传文件
export const uploadFile = async (file: File): Promise<UploadFileResult> => {
    const { uploadToken: token } = await api.upload.getUploadToken()
    const key = generateKey()
    const putExtra = {}
    const config = {
        useCdnDomain: true,
        region: qiniu.region.z2
    }
    const observable = qiniu.upload(file, key, token, putExtra, config)
    return new Promise(resolve => {
        const observer = {
            complete(res: { key: string; hash: string }) {
                const key = '/' + res.key
                const downloadURL = generateDownloadURL(key)
                resolve({
                    downloadURL,
                    key
                })
            }
        }
        observable.subscribe(observer)
    })
}

// 生成有效下载地址
export const generateDownloadURL = (url: string) => {
    const e = generateE()
    const baseURL = domainName + url
    const urlWithE = `${baseURL}?e=${e}`
    const sign = HmacSHA1(urlWithE, secretKey)
    const signBase64 = sign
        .toString(enc.Base64)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '')
    const token = [accessKey, signBase64].join(':')
    const downloadURL = `${baseURL}?e=${e}&token=${token}`
    return downloadURL
}

// 生成文件名
const generateKey = () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const key = [year, month, day].join('-') + '/' + v4()
    return key
}

// 生成过期时间戳
const generateE = () => {
    const duration = 300 * 1000 // 有效时间 300 秒
    const timestamp = Date.now()
    const e = (timestamp + duration).toString().slice(0, -3)
    return e
}
