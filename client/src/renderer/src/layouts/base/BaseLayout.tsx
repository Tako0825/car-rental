import { Col, Layout, Row } from 'antd'
import React, { ReactNode, memo } from 'react'
import { BaseHeader } from './BaseHeader'
import { BaseAside } from './BaseAside'

interface BaseLayoutProps {
    children: ReactNode
}

// 基本布局组件
export const BaseLayout: React.FC<BaseLayoutProps> = memo(({ children }) => {
    return (
        <Layout className="w-screen h-screen flex-row">
            <Col className="w-52 h-full drag bg-[#f8fafc]">
                <BaseAside /> {/* 左侧菜单栏 */}
            </Col>
            <Col className="flex-1 h-full flex-col">
                <Row className="w-full h-16 flex drag justify-between items-center px-10">
                    <BaseHeader /> {/* 顶部工具栏 */}
                </Row>
                <main className="p-5 pb-20 full overflow-auto">{children}</main>
            </Col>
        </Layout>
    )
})

BaseLayout.displayName = 'BaseLayout'
