import * as qiniu from 'qiniu-js'
import { v4 } from 'uuid'
import { HmacSHA1, enc } from 'crypto-js'

const domainName = import.meta.env.VITE_DOWNLOAD_URL // 加速域名
const accessKey = import.meta.env.VITE_ACCESS_KEY // ACCESS_KEY
const secretKey = import.meta.env.VITE_SECRET_KEY // SECRET_KEY

// 上传文件
export const uploadFile = async (file: File): Promise<string> => {
    const token = await getUploadToken()
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
                const baseURL = [domainName, res.key].join('/')
                const downloadURL = generateDownloadURL(baseURL)
                resolve(downloadURL)
            }
        }
        observable.subscribe(observer)
    })
}

// 生成下载凭据
export const generateDownloadURL = (baseURL: string) => {
    const e = generateE()
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

// 获取上传凭据
const getUploadToken = async () => {
    const json = await fetch('http://localhost:4000/api/upload', {
        method: 'GET',
        headers: {
            Authorization:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImVtYWlsIjoiZWxlY3Ryb24wMTE3QGdtYWlsLmNvbSJ9LCJzaWduIjoiY2FyLXJlbnRhbCIsImlhdCI6MTczMTQxMDc5OSwiZXhwIjoxNzM0MDAyNzk5fQ.2AUGysX-ril6qI51yeiDdLM9W90jgsn_Djw4mC3c__8'
        }
    })
    const res = await json.json()
    const token = res['data']['uploadToken']
    return token
}

// 生成文件夹名
const generateKey = () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() - 1
    const day = date.getDay()
    const key = [year, month, day].join('-') + '/' + v4()
    return key
}

// 生成过期时间戳
const generateE = () => {
    const duration = 10 * 60 * 1000
    const timestamp = Date.now()
    const e = timestamp + duration
    return e
}
