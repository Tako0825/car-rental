import React, { memo, useState } from 'react'
import { Button, GetProp, Upload, UploadFile, UploadProps } from 'antd'
import { UploadFileResult, uploadFile } from '../../utils/upload'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

// 获取预览图片
const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = error => reject(error)
    })

interface AntUploadProps {
    onSuccess?: (result: UploadFileResult) => void
    onPreview?: (url: string) => void
}

// 上传组件
export const AntUpload: React.FC<AntUploadProps> = memo(({ onSuccess, onPreview }) => {
    // responsive data
    const [fileList, setFileList] = useState<UploadFile[]>([])
    const [uploading, setUploading] = useState(false)

    // method: 上传文件
    const handleUpload = async (): Promise<void> => {
        setUploading(true)
        const file = fileList[0]
        if (file instanceof File) {
            try {
                const result = await uploadFile(file)
                onSuccess && onSuccess(result)
            } catch (error) {
                console.error('Upload failed:', error)
            } finally {
                setUploading(false)
            }
        }
    }

    // method: 手动上传
    const beforeUpload = async (file: UploadFile) => {
        setUploading(false)
        setFileList([file])
        const preview = await getBase64(file as FileType)
        if (onPreview) onPreview(preview)
        return false
    }

    // method: 删除文件
    const handleRemove = () => {
        setFileList([])
    }

    return (
        <>
            <Upload
                onRemove={handleRemove}
                beforeUpload={beforeUpload}
                fileList={fileList}
                showUploadList
            >
                <Button>Select File</Button>
            </Upload>
            <Button
                type="primary"
                onClick={handleUpload}
                disabled={fileList.length < 1}
                loading={uploading}
                style={{ marginTop: 16 }}
            >
                {uploading ? 'Uploading' : 'Start Upload'}
            </Button>
        </>
    )
})

AntUpload.displayName = 'AntUpload'
