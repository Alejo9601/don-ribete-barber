export const AUTH_COOKIE_NAME = 'patagon_barber_auth'

export function serializeAuthCookie(token: string, maxAgeSeconds: number) {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : ''

  return `${AUTH_COOKIE_NAME}=${encodeURIComponent(token)}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${maxAgeSeconds}${secure}`
}

export function clearAuthCookie() {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : ''

  return `${AUTH_COOKIE_NAME}=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0${secure}`
}
