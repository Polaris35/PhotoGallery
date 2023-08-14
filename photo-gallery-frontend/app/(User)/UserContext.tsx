'use client'
import { createContext, ReactNode, useContext, useState } from 'react'
import { Payload, User } from '../types'

type userContextProps = {
    user: User
    setUser: ({ id, username }: User) => void
}

export const UserContext = createContext<userContextProps>({
    user: { username: 'null' },
    setUser: ({ id, username }) => {},
})

export default function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User>({ username: '' })

    const contextValue = {
        user: user,
        setUser: setUser,
    }
    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    )
}
