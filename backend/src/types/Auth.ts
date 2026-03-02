import { User } from './User'

export interface AuthenticatedUser extends User {
  passwordHash: string
}

export interface AuthTokenPayload {
  sub: number | string
  username: string
  rol: string
  iat?: number
  exp?: number
}
