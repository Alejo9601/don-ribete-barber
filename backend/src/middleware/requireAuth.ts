import { NextFunction, Request, Response } from 'express'
import { AuthenticatedUser } from '../types/Auth'
import { AUTH_COOKIE_NAME } from '../utils/cookies'
import { verifyAuthToken } from '../utils/jwt'
import { getUserById } from '../services/userServices'

export interface AuthenticatedRequest extends Request {
  authUser?: AuthenticatedUser
}

export async function requireAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.cookies?.[AUTH_COOKIE_NAME]

    if (!token) {
      return res.status(401).json({ error: 'Authentication required' })
    }

    const payload = verifyAuthToken(token)

    if (!payload) {
      return res.status(401).json({ error: 'Invalid or expired session' })
    }

    const userId = Number(payload.sub)

    if (Number.isNaN(userId)) {
      return res.status(401).json({ error: 'Invalid session subject' })
    }

    const user = await getUserById(userId)

    if (!user) {
      return res.status(401).json({ error: 'Session user not found' })
    }

    req.authUser = user
    next()
  } catch (error) {
    next(error)
  }
}
