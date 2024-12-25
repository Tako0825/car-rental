import { RoleEnum } from '@renderer/api/types/enums'
import { generateDownloadURL } from '@renderer/utils/upload'
import { UserVo } from '@renderer/views/user'
import { Avatar, Button, DatePicker, Drawer, Form, Input, Select, Space, Tag } from 'antd'
import { DefaultOptionType } from 'antd/es/select'
import React, { memo, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { CloseOutlined } from '@ant-design/icons'
import { api } from '@renderer/api'
import { AntUpload } from '../ant/AntUpload'

interface UserCardProps {
    open: boolean
    onClose: (updatedUser?: UserVo) => void
    mode: 'view' | 'edit'
    id: number | undefined
}

// 用户卡片
export const UserCard: React.FC<UserCardProps> = memo(({ open, onClose, mode, id }) => {
    // reponsive data
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState<UserVo>()
    const [preview, setPreview] = useState<string>()

    // 打开用户卡片
    useEffect(() => {
        if (id && open) fetchData(id)
    }, [id, open])

    // 请求数据
    const fetchData = async (id: number) => {
        const { user } = await api.user.findOne(id)
        setUser(user)
    }

    // 提交表单: 修改用户信息
    const onSubmit = async () => {
        setLoading(true)
        if (user) {
            const { user: updatedUser } = await api.user.update(user.id, user)
            setUser(updatedUser)
            onClose(updatedUser)
            setLoading(false)
        }
    }

    // 关闭用户卡片
    const handleClose = () => {
        setPreview(undefined)
        onClose()
    }

    return (
        <Drawer
            placement="bottom"
            closable={false}
            onClose={handleClose}
            open={open}
            height={'100vh'}
            style={{
                width: '65vw',
                boxShadow: 'none',
                margin: 'auto',
                position: 'relative',
                overflow: 'unset'
            }}
        >
            {user ? (
                <main className="p-10 flex flex-col gap-20">
                    {/* 关闭图标 */}
                    <CloseOutlined
                        onClick={() => onClose()}
                        className="absolute top-16 right-16 cursor-pointer scale-150"
                    />

                    {/* 头像简介 */}
                    <Space size={20}>
                        <Avatar
                            size={200}
                            src={preview ? preview : generateDownloadURL(user.avatar)}
                        />
                        <AntUpload
                            onSuccess={result => setUser({ ...user, avatar: result.key })}
                            onPreview={preview => setPreview(preview)}
                        />
                        <Space direction="vertical" size={10} className="text-5xl rounded-2xl p-5">
                            <b>Hello!</b>
                            <b>I’m {user.username}</b>
                        </Space>
                    </Space>

                    {/* 表单 */}
                    <Form layout="vertical">
                        <section className="grid grid-cols-2 gap-x-10">
                            <Form.Item label="用户名">
                                <Input
                                    value={user.username}
                                    onInput={e =>
                                        setUser({ ...user, username: e.currentTarget.value })
                                    }
                                    type="text"
                                    disabled={mode === 'view'}
                                />
                            </Form.Item>
                            <Form.Item label="角色">
                                <Select
                                    value={user.role}
                                    onChange={value => setUser({ ...user, role: value })}
                                    options={roleOptions}
                                    disabled={mode === 'view'}
                                />
                            </Form.Item>
                            <Form.Item label="创建时间">
                                <DatePicker
                                    value={dayjs(user.createdAt, 'yyyy-MM-dd')}
                                    disabled
                                    className="full"
                                />
                            </Form.Item>
                        </section>
                    </Form>

                    {/* 控件 */}
                    <aside className="absolute bottom-10 -right-20">
                        <Button
                            type="primary"
                            onClick={onSubmit}
                            loading={loading}
                            hidden={mode === 'view'}
                        >
                            确认
                        </Button>
                    </aside>
                </main>
            ) : (
                <>出错</>
            )}
        </Drawer>
    )
})

// 角色选项
const roleOptions: DefaultOptionType[] = Object.keys(RoleEnum)
    .filter(role => typeof role !== 'number')
    .map(role => ({
        value: role,
        label: (
            <Tag key={role} color={RoleEnum[role]}>
                {role.toUpperCase()}
            </Tag>
        )
    }))

UserCard.displayName = 'UserCard'
