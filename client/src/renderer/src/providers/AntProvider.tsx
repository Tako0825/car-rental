import { ConfigProvider, ThemeConfig } from 'antd'
import React, { ReactNode, memo } from 'react'

interface AntProviderProps {
    children: ReactNode
}

export const AntProvider: React.FC<AntProviderProps> = memo(({ children }) => {
    // 全局配置
    const token: ThemeConfig['token'] = {
        colorPrimary: '#1abc9c',
        colorInfo: '#1abc9c',
        colorSuccess: '#1abc9c',
        colorWarning: '#ffbe76',
        colorError: '#ff7979',
        colorTextBase: '#2c3e50',
        colorBgBase: '#f8fafc',
        fontSize: 14,
        sizeStep: 6,
        wireframe: false
    }

    // 组件配置
    const components: ThemeConfig['components'] = {
        Divider: {
            margin: 30
        },
        Collapse: {
            padding: 36
        }
    }

    return <ConfigProvider theme={{ token, components }}>{children}</ConfigProvider>
})

AntProvider.displayName = 'AntProvider'
