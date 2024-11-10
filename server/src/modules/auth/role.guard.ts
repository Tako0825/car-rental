import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { User } from '@prisma/client'
import { Observable } from 'rxjs'

// 角色守卫
@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        const user: User = context.switchToHttp().getRequest().user
        const requiredRoles = this.reflector.get<string[]>(
            'role',
            context.getHandler()
        )
        return requiredRoles.includes(user.role) ? true : false
    }
}
