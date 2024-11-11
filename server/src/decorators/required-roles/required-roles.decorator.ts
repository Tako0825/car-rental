import { SetMetadata } from '@nestjs/common'
import { $Enums } from '@prisma/client'

export const RequiredRoles = (...roles: $Enums.Role[]) =>
    SetMetadata('role', roles)
