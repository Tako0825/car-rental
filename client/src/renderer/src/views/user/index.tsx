import { api } from '@renderer/api'
import { FindPageUserRequestDto } from '@renderer/api/modules/user'
import { UserEntity } from '@renderer/api/types/entities'
import { RoleEnum } from '@renderer/api/types/enums'
import { DetailType } from '@renderer/types/common'
import { generateDownloadURL } from '@renderer/utils/upload'
import { Avatar, Button, Drawer, Space, Table, Tag } from 'antd'
import { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import { debounce } from 'lodash'
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
    const [detail, setDetail] = useState<DetailType<UserVo>>()

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
            render: (role: string) => {
                const enums = {
                    [RoleEnum.user]: '#1abc9c',
                    [RoleEnum.admin]: '#ff6b81',
                    [RoleEnum.manager]: '#4834d4'
                }
                return <Tag color={enums[RoleEnum[role]]}>{role.toUpperCase()}</Tag>
            }
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
                    <Button type="link" onClick={() => showDrawer('view', row)} className="p-0">
                        查看
                    </Button>
                    <Button type="link" onClick={() => showDrawer('edit', row)} className="p-0">
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

    // method: 打开抽屉
    const showDrawer = (mode: 'view' | 'edit', row: UserVo) => {
        setDetail({ mode, row })
        setOpen(true)
    }

    // method: 关闭抽屉
    const closeDrawer = () => setOpen(false)

    return (
        <>
            <Table
                dataSource={dataSource}
                columns={columns}
                pagination={pagination}
                onChange={onPaginationChange}
                loading={loading}
            />
            <Drawer
                placement="bottom"
                closable={false}
                onClose={closeDrawer}
                open={open}
                height={'90vh'}
                style={{
                    width: '65vw',
                    margin: 'auto'
                }}
            >
                <p>{JSON.stringify(detail?.row)}</p>
            </Drawer>
        </>
    )
})

UserView.displayName = 'UserView'

export default UserView
