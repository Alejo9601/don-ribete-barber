import { ReactNode, createContext, useEffect, useRef, useState } from 'react'
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
  const hasManualAuthChange = useRef(false)

  useEffect(() => {
    let isCancelled = false

    getCurrentUser()
      .then((currentUser) => {
        if (isCancelled || hasManualAuthChange.current) {
          return
        }

        setUser(currentUser ?? undefined)
      })
      .catch((error) => {
        if (isCancelled || hasManualAuthChange.current) {
          return
        }

        console.error(error)
        setUser(undefined)
      })
      .finally(() => {
        if (isCancelled || hasManualAuthChange.current) {
          return
        }

        setIsAuthResolved(true)
      })

    return () => {
      isCancelled = true
    }
  }, [])

  function login(user: User) {
    hasManualAuthChange.current = true
    setUser(user)
    setIsAuthResolved(true)

    return Promise.resolve()
  }

  async function logout() {
    await logoutUser()
    hasManualAuthChange.current = true
    setUser(undefined)
    setIsAuthResolved(true)
  }

  return (
    <UserContext.Provider value={{ user, isAuthResolved, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}
