import PopupStack from '@/app/components/Alert/PopupStack'
import LoginForm from './LoginForm'

function Login() {
    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full rounded-lg shadow bg-primary-content border-neutral dark:border md:mt-0 sm:max-w-md xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-neutral-content md:text-2xl">
                        Sign in to your account
                    </h1>
                    <LoginForm />
                    <PopupStack />
                </div>
            </div>
        </div>
    )
}

export default Login
