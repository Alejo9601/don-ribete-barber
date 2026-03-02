import { createContext, useState } from 'react'
import { User } from '../types/User'

interface UserContextType {
  user: User | undefined
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  login: (user: User) => Promise<any>
  logout: () => void
}

const initialUserContext: UserContextType = {
  user: undefined,
  login: () => new Promise(() => {}),
  logout: () => {}
}

export const UserContext = createContext<UserContextType | undefined>(
  initialUserContext
)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function UserContextProvider({ children }: { children: any }) {
  const [user, setUser] = useState<User>()

  function login(user: User) {
    return new Promise((resolve) => {
      setUser(user)
      setTimeout(resolve, 1000)
    })
  }

  function logout() {
    setUser(undefined)
  }

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}
