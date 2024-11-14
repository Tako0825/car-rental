import { MenuProps, Space, Menu } from 'antd'
import React, { memo, useEffect, useState } from 'react'
import ElectronSvg from '../../assets/icons/electron.svg'
import { routes } from '@renderer/router'
import { useNavigate } from 'react-router-dom'

type MenuItem = Required<MenuProps>['items'][number]

// 左侧菜单栏
const items: MenuItem[] = routes.map(route => {
    const { label = '', path: key = '' } = route
    return { key, label }
})

export const BaseAside: React.FC = memo(() => {
    // router
    const navigate = useNavigate()

    // responsive data
    const [current, setCurrent] = useState(routes[0].path ?? '')

    // event: 切换菜单
    const onClick: MenuProps['onClick'] = e => setCurrent(e.key)

    // watch current
    useEffect(() => navigate(current), [current])

    return (
        <>
            <Space className="logo-container pl-10 py-5 flex items-center">
                <img className="w-8 no-drag logo" src={ElectronSvg} alt="logo" />
                <h2 className="electron no-drag text-2xl">Rental</h2>
            </Space>
            <Menu
                onClick={onClick}
                selectedKeys={[current]}
                mode="vertical"
                items={items}
                className="no-drag"
            />
        </>
    )
})

BaseAside.displayName = 'BaseAside'
