import { Input, Space } from 'antd'
import React, { memo, useState } from 'react'
import { BorderOutlined, CloseOutlined, CompressOutlined, MinusOutlined } from '@ant-design/icons'

// 顶部工具栏
export const BaseHeader: React.FC = memo(() => {
    const [isMaximized, setIsMaximized] = useState(false)

    // event: 最小化窗口
    const minimizeWindow = () => window.electron.minimizeWindow()

    // event: 缩放窗口
    const maximizeWindow = async () => {
        window.electron.maximizeWindow()
        const isMaximized = await window.electron.getIsMaximized()
        setIsMaximized(isMaximized)
    }

    // event: 关闭窗口
    const closeWindow = () => window.electron.closeWindow()

    return (
        <>
            <Input className="no-drag w-52" />
            <Space className="no-drag">
                <MinusOutlined onClick={minimizeWindow} />
                {isMaximized ? (
                    <CompressOutlined onClick={maximizeWindow} />
                ) : (
                    <BorderOutlined onClick={maximizeWindow} />
                )}
                <CloseOutlined onClick={closeWindow} />
            </Space>
        </>
    )
})

BaseHeader.displayName = 'BaseHeader'
