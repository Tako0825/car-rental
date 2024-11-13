import React, { memo, useState } from 'react'
import { Button, Upload, UploadFile } from 'antd'
import { uploadFile } from '../utils/upload'

interface AntUploadProps {
    handleSuccess?: (url: string) => void
}

// 上传组件
export const AntUpload: React.FC<AntUploadProps> = memo(({ handleSuccess }) => {
    // responsive data
    const [fileList, setFileList] = useState<UploadFile[]>([])
    const [uploading, setUploading] = useState(false)

    // method: 上传文件
    const handleUpload = async (): Promise<void> => {
        setUploading(true)
        const file = fileList[0]
        if (file instanceof File) {
            try {
                const url = await uploadFile(file)
                handleSuccess && handleSuccess(url)
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
        return false
    }

    // method: 删除文件
    const onRemove = () => {
        setFileList([])
    }

    return (
        <>
            <Upload
                onRemove={onRemove}
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

AntUpload.displayName = 'TakoUpload'
