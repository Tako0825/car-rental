import { routes } from '@renderer/router'
import { Col, Layout, Menu, MenuProps, Row } from 'antd'
import React, { ReactNode, memo, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type MenuItem = Required<MenuProps>['items'][number]

const items: MenuItem[] = routes.map(route => {
    const { label = '', path: key = '' } = route
    return { key, label }
})

interface BaseLayoutProps {
    children: ReactNode
}

// 基本布局组件
export const BaseLayout: React.FC<BaseLayoutProps> = memo(({ children }) => {
    // router
    const navigate = useNavigate()

    // responsive data
    const [current, setCurrent] = useState(routes[0].path ?? '')

    // event: 切换菜单
    const onClick: MenuProps['onClick'] = e => setCurrent(e.key)

    // watch current
    useEffect(() => navigate(current), [current])

    return (
        <Layout className="w-screen h-screen bg-slate-100 flex-row">
            <Col className="w-48 h-full bg-slate-300">
                <Menu onClick={onClick} selectedKeys={[current]} mode="vertical" items={items} />
            </Col>
            <Col className="flex-1 h-full flex-col">
                <Row className="text">header</Row>
                <main className="p-5 text">{children}</main>
            </Col>
        </Layout>
    )
})

BaseLayout.displayName = 'BaseLayout'
