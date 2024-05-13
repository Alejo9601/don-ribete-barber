import { User } from '../types/User'

function normalizeUser(response: any) {
  const user: User = {
    id: response.id,
    name: response.name,
    lastname: response.lastname,
    username: response.username,
    password: response.password,
    rol: response.rol
  }
  return user
}

export function getUser(username: string, password: string) {
  const header = new Headers()
  header.append('Authorization', 'Basic ' + btoa(username + ':' + password))

  return fetch('http://localhost:3000/api/admin-panel/login', {
    method: 'GET',
    headers: header
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Response was not OK')
      }
      return response.json()
    })
    .then((jsonResponse) => normalizeUser(jsonResponse))
    .catch((error) => {
      console.error(error)
      throw error
    })
}
