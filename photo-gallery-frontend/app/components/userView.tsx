'use client'
import { useContext, useEffect } from 'react'
import { UserContext } from '../(User)/UserContext'
import { useRouter } from 'next/navigation'
import { Payload } from '../types'

function UserView() {
    const { user, setUser } = useContext(UserContext)
    const router = useRouter()
    useEffect(() => {
        const token = localStorage.getItem('authToken')
        if (!token) {
            console.log('missing auth token')
            // router.push('/Login')
            return
        }
        const payload: Payload = JSON.parse(atob(token.split('.')[1]))
        setUser({
            id: payload.userId,
            username: payload.username,
        })
    }, [])

    const logOut = () => {
        localStorage.removeItem('authToken')
        router.push('/Login')
    }

    return (
        <div className="flex gap-3">
            <div className="text-lg">{user.username}</div>
            <button className="link link-secondary" onClick={logOut}>
                log out
            </button>
        </div>
    )
}

export default UserView
