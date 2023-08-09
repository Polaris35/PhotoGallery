'use client'
import { FormEvent, useContext, useState } from 'react'
import Link from 'next/link'
import AlertContext from '@/app/components/Alert/AlertContext'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { AlertType } from '@/app/components/Alert/AlertPopup'
import { useRouter } from 'next/navigation'
import { ServerErrorResponse, User } from '../types'
import Login from '@/app/utils/Login'

function LoginForm() {
    const { addAlert } = useContext(AlertContext)
    const [login, setLogin] = useState('username')
    const [password, setPassword] = useState('passwordpassword')
    const [rememberMe, setRememberMe] = useState(false)

    const router = useRouter()

    const onSubmit = (event: FormEvent) => {
        event.preventDefault()
        // todo Login({login,password}, setUserContext)
    }
    return (
        <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
            <div className="form-control w-full">
                <label className={'label'}>
                    <span className="label-text text-neutral-content">
                        Your username
                    </span>
                </label>
                <input
                    type="text"
                    className="input input-bordered input-primary w-full focus:border-none focus:drop-shadow-md invalid:border-red-700"
                    placeholder="your name or login"
                    minLength={4}
                    maxLength={12}
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    required
                />
            </div>
            <div className="form-control w-full">
                <label className={'label'}>
                    <span className="label-text text-neutral-content">
                        Password
                    </span>
                </label>
                <input
                    type="password"
                    placeholder="••••••••"
                    className="input input-bordered input-primary w-full focus:border-none focus:drop-shadow-md invalid:border-red-700"
                    minLength={8}
                    maxLength={16}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div className="form-control">
                <label className="label justify-start gap-3 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(event) =>
                            setRememberMe(event.target.checked)
                        }
                        name="rememberMe"
                        className="checkbox checkbox-primary"
                    />
                    <span className="label-text text-neutral-content text-md">
                        Remember me
                    </span>
                </label>
            </div>
            <button type="submit" className="w-full btn btn-primary">
                Sign in
            </button>
            <div className="text-sm font-light flex gap-2">
                <span>Don’t have an account yet?</span>
                <Link
                    href="/Registration"
                    className="font-medium link link-primary"
                >
                    Sign up
                </Link>
            </div>
        </form>
    )
}

export default LoginForm
