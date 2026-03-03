import { CookieOptions } from 'express'

export const AUTH_COOKIE_NAME = 'patagon_barber_auth'

function resolveCookieOptions(maxAgeSeconds: number): CookieOptions {
  const sameSite = process.env.AUTH_COOKIE_SAME_SITE ?? 'Lax'
  const secureByEnv = process.env.AUTH_COOKIE_SECURE === 'true'
  const secure = secureByEnv || sameSite.toLowerCase() === 'none'
  const domain = process.env.AUTH_COOKIE_DOMAIN

  return {
    httpOnly: true,
    path: '/',
    sameSite: sameSite.toLowerCase() as CookieOptions['sameSite'],
    secure,
    maxAge: maxAgeSeconds * 1000,
    ...(domain ? { domain } : {})
  }
}

export function getAuthCookieOptions(maxAgeSeconds: number) {
  return resolveCookieOptions(maxAgeSeconds)
}

export function getClearAuthCookieOptions() {
  return resolveCookieOptions(0)
}
