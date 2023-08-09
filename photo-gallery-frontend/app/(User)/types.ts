export type User = {
    id?:number
    username: string
    password?: string
}

export type ServerErrorResponse = {
    error: string
    // Другие возможные поля
}