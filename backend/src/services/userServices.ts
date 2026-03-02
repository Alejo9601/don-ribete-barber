import { client } from '../models/db_client'
import { User } from '../types/User'

function normalizeUser(response: any) {
  let user: User
  if (response.rows.length === 0) {
    user = {
      id: -1,
      name: '',
      lastname: '',
      username: '',
      password: '',
      rol: ''
    }
  } else {
    user = {
      id: response.rows[0].id,
      name: response.rows[0].name,
      lastname: response.rows[0].lastname,
      username: response.rows[0].username,
      password: response.rows[0].password,
      rol: response.rows[0].rol
    }
  }
  return user
}

export async function getUser(username: string, password: string) {
  return client
    .execute({
      sql: `SELECT * FROM users WHERE users.username = "${username}"`,
      args: []
    })
    .then((response) => normalizeUser(response))
    .then((user: User) => (validateUserPassword(user, password) ? user : null))
}

export function validateUserPassword(user: User, password: string) {
  return user.id !== -1 && user.password === password
}
