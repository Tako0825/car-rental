import { api } from '@renderer/api'
import { FindPageUserRequestDto } from '@renderer/api/modules/user'
import { UserEntity } from '@renderer/api/types/entities'
import { RoleEnum } from '@renderer/api/types/enums'
import { formatDateTime } from '@renderer/utils/format'
import { Table, Tag } from 'antd'
import { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import { debounce } from 'lodash'
import React, { memo, useEffect, useState } from 'react'

// 用户管理
const UserView: React.FC = memo(() => {
    // responsive data
    const [dataSource, setDataSource] = useState<Omit<UserEntity, 'password' | 'email'>[]>([])
    const [pagination, setPagination] = useState<TablePaginationConfig>()
    const [params, setParams] = useState<FindPageUserRequestDto>({ page: 1, pageSize: 10 })
    const [loading, setLoading] = useState(false)

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
    const onChange = (pagination: TablePaginationConfig) => {
        setPagination(pagination)
        const { current: page = 1, pageSize = 10 } = pagination
        setParams({ ...params, page, pageSize })
    }

    return (
        <>
            <Table
                dataSource={dataSource}
                columns={columns}
                pagination={pagination}
                onChange={onChange}
                loading={loading}
            />
        </>
    )
})

// 列表项
const columns: ColumnsType<Omit<UserEntity, 'password' | 'email'>> = [
    {
        title: '用户名',
        key: 'username',
        dataIndex: 'username'
    },
    {
        title: '权限',
        key: 'role',
        dataIndex: 'role',
        render: (text: string) => {
            const enums = {
                [RoleEnum.user]: '#1abc9c',
                [RoleEnum.admin]: '#ff6b81',
                [RoleEnum.manager]: '#4834d4'
            }
            return <Tag color={enums[RoleEnum[text]]}>{text.toUpperCase()}</Tag>
        }
    },
    {
        title: '创建时间',
        key: 'createdAt',
        dataIndex: 'createdAt',
        render: (text: string) => formatDateTime(text)
    }
]

UserView.displayName = 'UserView'

export default UserView
