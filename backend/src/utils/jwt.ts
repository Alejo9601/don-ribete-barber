import jwt from 'jsonwebtoken'
import { AuthTokenPayload } from '../types/Auth'

const TOKEN_TTL_SECONDS = 60 * 60 * 12
const jwtSecret = process.env.JWT_SECRET ?? 'change-me-in-production'

function isAuthTokenPayload(payload: jwt.JwtPayload) {
  return (
    (typeof payload.sub === 'number' || typeof payload.sub === 'string') &&
    typeof payload.username === 'string' &&
    typeof payload.rol === 'string'
  )
}

export function signAuthToken(payload: AuthTokenPayload) {
  return {
    token: jwt.sign(payload, jwtSecret, {
      algorithm: 'HS256',
      expiresIn: TOKEN_TTL_SECONDS
    }),
    maxAgeSeconds: TOKEN_TTL_SECONDS
  }
}

export function verifyAuthToken(token: string) {
  try {
    const payload = jwt.verify(token, jwtSecret, {
      algorithms: ['HS256']
    })

    if (typeof payload === 'string') {
      return null
    }

    return isAuthTokenPayload(payload)
      ? (payload as unknown as AuthTokenPayload)
      : null
  } catch (_error) {
    return null
  }
}
