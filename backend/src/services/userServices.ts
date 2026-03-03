import { client } from '../models/db_client'
import { AuthenticatedUser } from '../types/Auth'
import { User } from '../types/User'
import { hashPassword, verifyPassword } from '../utils/passwords'

interface UserRow {
  id: number
  name: string
  lastname: string
  username: string
  password: string
  rol: string
}

function normalizeUser(row: UserRow): AuthenticatedUser {
  return {
    id: row.id,
    name: row.name,
    lastname: row.lastname,
    username: row.username,
    rol: row.rol,
    passwordHash: row.password
  }
}

function sanitizeUser(user: AuthenticatedUser): User {
  return {
    id: user.id,
    name: user.name,
    lastname: user.lastname,
    username: user.username,
    rol: user.rol
  }
}

async function getStoredUserByUsername(username: string) {
  const response = await client.execute({
    sql: 'SELECT id, name, lastname, username, password, rol FROM users WHERE users.username = ?',
    args: [username]
  })

  const row = response.rows[0]

  if (!row) {
    return null
  }

  return normalizeUser(row as unknown as UserRow)
}

export async function getUserById(id: number) {
  const response = await client.execute({
    sql: 'SELECT id, name, lastname, username, password, rol FROM users WHERE users.id = ?',
    args: [id]
  })

  const row = response.rows[0]

  if (!row) {
    return null
  }

  return normalizeUser(row as unknown as UserRow)
}

async function upgradeStoredPassword(user: AuthenticatedUser, plainPassword: string) {
  const newPasswordHash = await hashPassword(plainPassword)

  await client.execute({
    sql: 'UPDATE users SET password = ? WHERE id = ?',
    args: [newPasswordHash, user.id]
  })
}

export async function authenticateUser(username: string, password: string) {
  const user = await getStoredUserByUsername(username)

  if (!user) {
    return null
  }

  const validation = await verifyPassword(password, user.passwordHash)

  if (!validation.isValid) {
    return null
  }

  if (validation.needsUpgrade) {
    await upgradeStoredPassword(user, password)
  }

  return sanitizeUser(user)
}

export function toPublicUser(user: AuthenticatedUser) {
  return sanitizeUser(user)
}
