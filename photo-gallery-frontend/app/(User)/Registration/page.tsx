'use client'
import {FormEvent, useContext, useState} from "react";
import AlertContext from "@/app/components/Alert/AlertContext";
import {AlertType} from "@/app/components/Alert/AlertPopup";
import {useMutation} from "@tanstack/react-query";
import {useRouter} from "next/navigation";
import Link from "next/link";
import axios from "axios";


type User = {
    username:string;
    password: string;
}

function RegistrationForm() {
    const {addAlert} = useContext(AlertContext);
    const [login, setLogin] = useState('username');
    const [password, setPassword] = useState('password');
    const [confirmPass, setConfirmPass] = useState('password');
    const router = useRouter()

    const mutation = useMutation({
        mutationFn: (user:User) => {
            console.log(user);
          return axios.post('http://localhost:8080/api/user/registration', user)
        },
        onSuccess: () => {
            addAlert(AlertType.success, 'new user successful registered');
         // void router.push('/Login');
        },
        onError: (error:string) => {
            addAlert(AlertType.error, error)
        }
      })

    const onSubmit = async (event:FormEvent)=>{
        event.preventDefault();
        if(login.length < 4 ) {
            addAlert(AlertType.info, 'login must be at least 4 characters long');
            return;
        }
        if(password.length < 8) {
            addAlert(AlertType.info, 'password must be at least 8 characters long');
            return;
        }
        if(password !== confirmPass) {
            addAlert(AlertType.error, 'password not the same');
            return;
        }
        mutation.mutateAsync({ username: login, password: password });
    }
    
    
    // if(mutation.isSuccess)
    // {
    //     addAlert(AlertType.success, 'new user successful registered');
    //     // void router.push('/Login');
    // }

    return (
        <>
                <h1 className="text-xl font-bold leading-tight tracking-tight text-neutral-content md:text-2xl">
                    Create an account
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
                    <div className="form-control w-full">
                        <label className={"label"}>
                            <span className="label-text text-neutral-content">Your username</span>
                        </label>
                        <input type="text"
                               value={login} onChange={(e) => setLogin(e.target.value)}
                               className="input input-bordered input-primary w-full focus:border-none focus:drop-shadow-md"
                               placeholder="some name"/>
                    </div>
                    <div className="form-control w-full">
                        <label className={"label"}>
                            <span className="label-text text-neutral-content">Password</span>
                        </label>
                        <input type="password" placeholder="••••••••" value={password}
                               onChange={(e) => setPassword(e.target.value)}
                               className="input input-bordered input-primary w-full focus:border-none focus:drop-shadow-md"
                        />
                    </div>
                    <div className="form-control w-full">
                        <label className={"label"}>
                            <span className="label-text text-neutral-content">Confirm password</span>
                        </label>
                        <input type="password" placeholder="••••••••"
                               value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)}
                               className="input input-bordered input-primary w-full focus:border-none focus:drop-shadow-md"
                        />
                    </div>
                    <button type="submit"
                            className="w-full mt-3 btn btn-primary">Create an account
                    </button>
                    <div className="text-sm font-light flex gap-2">
                        <span>Already have an account?</span>
                        <Link href="/Login"
                              className="font-medium link link-primary">Login here</Link>
                    </div>
                </form>
                </>
    )
}
export default RegistrationForm;