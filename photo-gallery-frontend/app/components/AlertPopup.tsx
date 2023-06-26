'use client'
import {useEffect, useState} from "react";

export enum AlertType {
    warning,
    success,
    error
}
export type Alert = {
    type: AlertType;
    alertMessage: string;
}
export default function AlertPopup(props:Alert) {
    const [showPopup, setShowPopup] =
        useState(true);

    useEffect(() => {
        if (showPopup) {
            const timer = setTimeout(() => {
                setShowPopup(false);
            }, 5000);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [showPopup]);

    const handleShowPopup = () => {
        setShowPopup(true);
    };

    if(!showPopup)
        return <></>

    switch(props.type)
    {
        case(AlertType.warning):
            return (
                <div className={`alert alert-warning fixed bottom-5 right-5`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    <span>{props.alertMessage}</span>
                </div>
            )
        case(AlertType.success):
            return (
                <div className={`alert alert-success fixed bottom-5 right-5`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>{props.alertMessage}</span>
                </div>
            )
        case(AlertType.error):
            return (
                <div className={`alert alert-warning fixed bottom-5 right-5`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>{props.alertMessage}</span>
                </div>
            )
    }
}