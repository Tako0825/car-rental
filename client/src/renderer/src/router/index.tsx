import { lazy, Suspense } from 'react'
import { Spin as Loading } from 'antd'
import { RouteObject } from 'react-router-dom'

const User = lazy(() => import('../views/user'))
const Car = lazy(() => import('../views/car'))
const Dashboard = lazy(() => import('../views/dashboard'))
const Rental = lazy(() => import('../views/rental'))
const Community = lazy(() => import('../views/community'))
const Personal = lazy(() => import('../views/personal'))

interface LazyComponentProps {
    component: React.LazyExoticComponent<React.FC>
}

// 异步导入组件
const LazyComponent: React.FC<LazyComponentProps> = props => {
    return (
        <Suspense fallback={<Loading />}>
            <props.component />
        </Suspense>
    )
}

type RouteType = RouteObject & {
    label?: string
}

// 路由配置
export const routes: RouteType[] = [
    {
        path: '/',
        element: <LazyComponent component={Dashboard} />,
        label: '工作台'
    },
    {
        path: '/user',
        element: <LazyComponent component={User} />,
        label: '用户管理'
    },
    {
        path: '/car',
        element: <LazyComponent component={Car} />,
        label: '车辆管理'
    },
    {
        path: '/rental',
        element: <LazyComponent component={Rental} />,
        label: '租赁'
    },
    {
        path: '/community',
        element: <LazyComponent component={Community} />,
        label: '社区'
    },
    {
        path: '/personal',
        element: <LazyComponent component={Personal} />,
        label: '个人中心'
    }
]
