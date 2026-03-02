import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

export function useUser() {
  const userContext = useContext(UserContext)

  if (!userContext) {
    throw new Error('useUser must be used within a UserContextProvider')
  }

  const { user, isAuthResolved, login, logout } = userContext

  return { user, isAuthResolved, login, logout }
}
