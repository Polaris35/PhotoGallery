'use client'
import { useContext } from 'react'
import { UserContext } from '../(User)/UserContext'

function UserView() {
    const { user } = useContext(UserContext)
    return <span>user.username</span>
}

export default UserView
