export type Role = 'USER' | 'ADMIN'

export interface User {
    _id?: string,
    email: string,
    password?: string,
    roles?: Role[]
}
