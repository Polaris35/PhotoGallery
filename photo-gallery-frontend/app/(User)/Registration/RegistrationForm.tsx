'use client'
import { FormEvent, useContext, useState } from 'react'
import AlertContext from '@/app/components/Alert/AlertContext'
import { AlertType } from '@/app/components/Alert/AlertPopup'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import axios, { AxiosError } from 'axios'

type User = {
    username: string
    password: string
}

type ServerErrorResponse = {
    error: string
    // Другие возможные поля
}

export default function RegistrationForm() {
    const { addAlert } = useContext(AlertContext)
    const [login, setLogin] = useState('username')
    const [password, setPassword] = useState('passwordpassword')
    const [confirmPass, setConfirmPass] = useState('passwordpassword')
    const router = useRouter()

    const mutation = useMutation({
        mutationFn: (user: User) => {
            // console.log(user)
            return axios.post(
                'http://localhost:8080/api/user/registration',
                user
            )
        },
        onSuccess: () => {
            addAlert(AlertType.success, 'new user successful registered')
            // void router.push('/Login');
        },
        onError: (error: AxiosError) => {
            const status = error.response?.status
            if (!status) return

            const err = error.response?.data as ServerErrorResponse
            addAlert(AlertType.error, err.error)
        },
    })

    const onSubmit = (event: FormEvent) => {
        event.preventDefault()
        if (login.length < 4) {
            addAlert(AlertType.info, 'login must be at least 4 characters long')
            return
        }
        if (password.length < 8) {
            addAlert(
                AlertType.info,
                'password must be at least 8 characters long'
            )
            return
        }
        if (password !== confirmPass) {
            addAlert(AlertType.error, 'password not the same')
            return
        }
        mutation.mutate({ username: login, password: password })
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
                    minLength={4}
                    maxLength={12}
                    name="login"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    className="input input-bordered input-primary w-full focus:border-none focus:drop-shadow-md"
                    placeholder="some name"
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
                    minLength={8}
                    maxLength={16}
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input input-bordered input-primary w-full focus:border-none focus:drop-shadow-md"
                    required
                />
            </div>
            <div className="form-control w-full">
                <label className={'label'}>
                    <span className="label-text text-neutral-content">
                        Confirm password
                    </span>
                </label>
                <input
                    type="password"
                    placeholder="••••••••"
                    minLength={8}
                    maxLength={16}
                    name="confirmPsw"
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                    className="input input-bordered input-primary w-full focus:border-none focus:drop-shadow-md"
                    required
                />
            </div>
            <button type="submit" className="w-full mt-3 btn btn-primary">
                Create an account
            </button>
            <div className="text-sm font-light flex gap-2">
                <span>Already have an account?</span>
                <Link href="/Login" className="font-medium link link-primary">
                    Login here
                </Link>
            </div>
        </form>
    )
}
