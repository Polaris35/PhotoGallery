'use client'
import { createContext, ReactNode, useState } from 'react'
import { User } from './types'

type userContextProps = {
    user: User
    setUserContext: ({ id, username }: { id: number; username: string }) => void
}

export const UserContext = createContext<userContextProps>({
    user: { username: 'null' },
    setUserContext: ({ id, username }) => {},
})

export default function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User>({
        username: '0',
    })

    const contextValue = {
        user: user,
        setUserContext: setUser,
    }
    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    )
}
