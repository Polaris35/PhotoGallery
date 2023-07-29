'use client'
import {FormEvent, useState} from "react";
import Link from "next/link";

function Registration() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [checkState, setCheckState] = useState(false);

    const onSubmit = (event:FormEvent)=>{
        event.preventDefault();
        // if(login !== '' && password !== '')

    }
    return (
        <div
            className="w-full rounded-lg shadow bg-primary-content border-neutral dark:border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-neutral-content md:text-2xl">
                    Sign in to your account
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
                    <div className="form-control w-full">
                        <label className={"label"}>
                            <span className="label-text text-neutral-content">Your username</span>
                        </label>
                        <input type="text"
                               className="input input-bordered input-primary w-full focus:border-none focus:drop-shadow-md"
                               placeholder="some name"/>
                    </div>
                    <div className="form-control w-full">
                        <label className={"label"}><span className="label-text text-neutral-content">Password</span></label>
                        <input type="password" placeholder="••••••••"
                               className="input input-bordered input-primary w-full focus:border-none focus:drop-shadow-md"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label justify-start gap-3 cursor-pointer">
                            <input type="checkbox" checked={checkState}
                                   onChange={(event)=>
                                       setCheckState(event.target.checked)}
                                   className="checkbox checkbox-primary" />
                            <span className="label-text text-neutral-content text-md">Remember me</span>
                        </label>
                    </div>
                    <button type="submit"
                            className="w-full btn btn-primary">Sign
                        in
                    </button>
                    <div className="text-sm font-light flex gap-2">
                        <span>Don’t have an account yet?</span>
                        <Link href="/"
                              className="font-medium link link-primary">Sign
                            up</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Registration;