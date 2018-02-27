export type TokenType = 'REMEMBER_ME'

export interface UserSessionToken {
  readonly _id?: string
  readonly userId: string
  readonly token?: string
  readonly expires?: Date
}
