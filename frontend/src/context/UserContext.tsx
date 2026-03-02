import { ReactNode, createContext, useEffect, useState } from 'react'
import { User } from '../types/User'
import { getCurrentUser, logoutUser } from '../services/userServices'

interface UserContextType {
  user: User | undefined
  isAuthResolved: boolean
  login: (user: User) => Promise<void>
  logout: () => Promise<void>
}

const initialUserContext: UserContextType = {
  user: undefined,
  isAuthResolved: false,
  login: async () => {},
  logout: async () => {}
}

export const UserContext = createContext<UserContextType | undefined>(
  initialUserContext
)

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>()
  const [isAuthResolved, setIsAuthResolved] = useState(false)

  useEffect(() => {
    getCurrentUser()
      .then((currentUser) => {
        setUser(currentUser ?? undefined)
      })
      .catch((error) => {
        console.error(error)
        setUser(undefined)
      })
      .finally(() => {
        setIsAuthResolved(true)
      })
  }, [])

  function login(user: User) {
    setUser(user)
    setIsAuthResolved(true)

    return Promise.resolve()
  }

  async function logout() {
    await logoutUser()
    setUser(undefined)
    setIsAuthResolved(true)
  }

  return (
    <UserContext.Provider value={{ user, isAuthResolved, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}
