import express from 'express'
import { authenticateUser, toPublicUser } from '../services/userServices'
import { requireAuth, AuthenticatedRequest } from '../middleware/requireAuth'
import {
  AUTH_COOKIE_NAME,
  getAuthCookieOptions,
  getClearAuthCookieOptions
} from '../utils/cookies'
import { signAuthToken } from '../utils/jwt'

const userRouter = express.Router()

userRouter.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body as {
      username?: string
      password?: string
    }

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' })
    }

    const user = await authenticateUser(username, password)

    if (user === null) {
      return res.status(401).json({ error: 'Username or password incorrect' })
    }

    const { token, maxAgeSeconds } = signAuthToken({
      sub: user.id,
      username: user.username,
      rol: user.rol
    })

    res.cookie(AUTH_COOKIE_NAME, token, getAuthCookieOptions(maxAgeSeconds))
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
})

userRouter.get('/session', requireAuth, (req: AuthenticatedRequest, res) => {
  if (!req.authUser) {
    return res.status(401).json({ error: 'Authentication required' })
  }

  res.status(200).json(toPublicUser(req.authUser))
})

userRouter.post('/logout', (_req, res) => {
  res.clearCookie(AUTH_COOKIE_NAME, getClearAuthCookieOptions())
  res.status(204).send()
})

export default userRouter
