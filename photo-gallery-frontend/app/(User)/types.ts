export type User = {
    id?:string
    username: string
    password?: string
}

export type ServerErrorResponse = {
    error: string
    // Другие возможные поля
}

export type Payload = {
    userId: string;
    username: string;
    iat: number;
    exp: number;
}