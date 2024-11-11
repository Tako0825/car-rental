import { $Enums, User } from '@prisma/client'

export class UserEntity implements User {
    id: number = 0
    createdAt: Date = new Date()
    email: string = ''
    password: string = ''
    role: $Enums.Role = 'user'
    updatedAt: Date = new Date()
    username: string = ''
}
