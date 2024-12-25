// 用户角色枚举
export enum RoleEnum {
    user = '#1abc9c', /// 普通用户
    admin = '#ff6b81', /// 管理员
    manager = '#4834d4' /// 车辆管理人员
}

// 车辆状态枚举
export enum CarStatusEnum {
    available, /// 可用
    rented, /// 已租出
    maintenance /// 维修中
}

// 租赁状态枚举
export enum RentalStatusEnum {
    active, /// 进行中
    completed, /// 已完成
    cancelled /// 已取消
}

// 支付状态枚举
export enum PaymentStatusEnum {
    pending, /// 待支付
    completed, /// 已完成
    failed /// 失败
}
