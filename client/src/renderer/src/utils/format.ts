export const formatDateTime = (dateTime: string | Date): string => {
    const date = dateTime instanceof Date ? dateTime : new Date(dateTime)
    const now: Date = new Date()
    const diffInSeconds: number = Math.floor((now.getTime() - date.getTime()) / 1000) // 时间差，单位为秒

    // 时间单位
    const SECOND: number = 1
    const MINUTE: number = 60 * SECOND
    const HOUR: number = 60 * MINUTE
    const DAY: number = 24 * HOUR

    // 小于一分钟时，返回“刚刚”
    if (diffInSeconds < MINUTE) {
        return '刚刚'
    }

    // 小于一小时时，返回多少分钟前
    if (diffInSeconds < HOUR) {
        const minutes: number = Math.floor(diffInSeconds / MINUTE)
        return `${minutes}分钟前`
    }

    // 小于一天时，返回多少小时前
    if (diffInSeconds < DAY) {
        const hours: number = Math.floor(diffInSeconds / HOUR)
        return `${hours}小时前`
    }

    // 同年时，返回月份和日期
    if (date.getFullYear() === now.getFullYear()) {
        const formattedDate = new Intl.DateTimeFormat('zh-CN', {
            month: 'long', // 月份全名
            day: 'numeric' // 日期
        }).format(date)
        return formattedDate.replace('月', '月 ').replace('日', '日') // 确保月日之间有一个空格
    }

    // 不同年时，返回年月日
    const formattedDate = new Intl.DateTimeFormat('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date)
    return formattedDate.replace('月', '月 ').replace('日', '日') // 确保月日之间有空格
}
