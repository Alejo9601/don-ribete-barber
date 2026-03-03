import { User } from '../types/User'
import { getApiUrl } from '../utils/api'

interface UserResponse {
  id: number
  name: string
  lastname: string
  username: string
  rol: string
}

function normalizeUser(response: UserResponse) {
  const user: User = {
    id: response.id,
    name: response.name,
    lastname: response.lastname,
    username: response.username,
    rol: response.rol
  }
  return user
}

export function loginUser(username: string, password: string) {
  return fetch(getApiUrl('/api/admin-panel/login'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ username, password })
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Login failed')
      }
      return response.json()
    })
    .then((jsonResponse) => normalizeUser(jsonResponse))
    .catch((error) => {
      console.error(error)
      throw error
    })
}

export function getCurrentUser() {
  return fetch(getApiUrl('/api/admin-panel/session'), {
    method: 'GET',
    credentials: 'include'
  })
    .then((response) => {
      if (response.status === 401) {
        return null
      }

      if (!response.ok) {
        throw new Error('Session check failed')
      }

      return response.json()
    })
    .then((jsonResponse) =>
      jsonResponse === null ? null : normalizeUser(jsonResponse as UserResponse)
    )
}

export function logoutUser() {
  return fetch(getApiUrl('/api/admin-panel/logout'), {
    method: 'POST',
    credentials: 'include'
  }).then((response) => {
    if (!response.ok && response.status !== 204) {
      throw new Error('Logout failed')
    }
  })
}
