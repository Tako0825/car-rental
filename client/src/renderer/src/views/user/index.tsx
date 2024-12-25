import { api } from '@renderer/api'
import { FindPageUserRequestDto } from '@renderer/api/modules/user'
import { UserEntity } from '@renderer/api/types/entities'
import { RoleEnum } from '@renderer/api/types/enums'
import { UserCard } from '@renderer/components/feature/UserCard'
import { generateDownloadURL } from '@renderer/utils/upload'
import { Avatar, Button, Space, Table, Tag } from 'antd'
import { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import { clone, debounce } from 'lodash'
import React, { memo, useEffect, useState } from 'react'

export type UserVo = Omit<UserEntity, 'password' | 'email'>

// 用户管理
const UserView: React.FC = memo(() => {
    // responsive data
    const [dataSource, setDataSource] = useState<UserVo[]>([])
    const [pagination, setPagination] = useState<TablePaginationConfig>()
    const [params, setParams] = useState<FindPageUserRequestDto>({ page: 1, pageSize: 10 })
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [mode, setMode] = useState<'view' | 'edit'>('view')
    const [id, setId] = useState<number>()

    // 列表项
    const columns: ColumnsType<UserVo> = [
        {
            title: 'ID',
            key: 'id',
            dataIndex: 'id',
            align: 'center'
        },
        {
            title: '头像',
            key: 'avatar',
            dataIndex: 'avatar',
            render: (avatar: string) => <Avatar src={generateDownloadURL(avatar)} size={60} />
        },
        {
            title: '用户名',
            key: 'username',
            dataIndex: 'username'
        },
        {
            title: '权限',
            key: 'role',
            dataIndex: 'role',
            render: (role: RoleEnum) => <Tag color={RoleEnum[role]}>{role.toUpperCase()}</Tag>
        },
        {
            title: '创建时间',
            key: 'createdAt',
            dataIndex: 'createdAt',
            render: (createdAt: string) => new Date(createdAt).toDateString()
        },
        {
            title: '操作',
            key: 'operation',
            width: '150px',
            render: (_, row) => (
                <Space size={14}>
                    <Button
                        type="link"
                        onClick={() => openUserCard('view', row.id)}
                        className="p-0"
                    >
                        查看
                    </Button>
                    <Button
                        type="link"
                        onClick={() => openUserCard('edit', row.id)}
                        className="p-0"
                    >
                        编辑
                    </Button>
                </Space>
            ),
            fixed: 'right'
        }
    ]

    // watch params
    useEffect(() => {
        fetchData(params)
    }, [params])

    // 请求数据
    const fetchData = debounce(async (params: FindPageUserRequestDto) => {
        setLoading(true)
        const res = await api.user.findPage(params)
        const { list, pagination } = res
        setDataSource(list)
        setPagination(pagination)
        setLoading(false)
    }, 100)

    // event: 表格变化
    const onPaginationChange = (pagination: TablePaginationConfig) => {
        setPagination(pagination)
        const { current: page = 1, pageSize = 10 } = pagination
        setParams({ ...params, page, pageSize })
    }

    // methods: 打开用户卡片
    const openUserCard = (mode: 'view' | 'edit', id: number) => {
        setOpen(true)
        setMode(mode)
        setId(id)
    }

    // methods: 关闭用户卡片
    const closeUserCard = (updatedUser?: UserVo) => {
        setOpen(false)
        if (updatedUser) {
            setDataSource(state => {
                const shallow = clone(state)
                const index = shallow.findIndex(user => user.id === updatedUser.id)
                if (index > -1) {
                    shallow[index] = updatedUser
                    return shallow
                } else {
                    return state
                }
            })
        }
    }

    return (
        <>
            <Table
                dataSource={dataSource}
                columns={columns}
                pagination={pagination}
                onChange={onPaginationChange}
                loading={loading}
            />
            <UserCard id={id} mode={mode} open={open} onClose={closeUserCard} />
        </>
    )
})

UserView.displayName = 'UserView'

export default UserView
