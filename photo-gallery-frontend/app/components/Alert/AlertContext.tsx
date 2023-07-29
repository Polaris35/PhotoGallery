'use client'
import { createContext, ReactNode, useState } from 'react'
import { Alert, AlertType } from '@/app/components/Alert/AlertPopup'

type AlertContextProps = {
    alertList: Alert[]
    addAlert: (type: AlertType, alertMessage: string) => void
}

const AlertContext = createContext<AlertContextProps>({
    alertList: [],
    addAlert: (type, alertMessage) => {},
})

export const AlertProvider = ({ children }: { children: ReactNode }) => {
    const [alertList, setAlertList] = useState<Alert[]>([])

    const addAlert = (type: AlertType, alertMessage: string) => {
        setAlertList((c) => [...c, { type, alertMessage }])
        const interval = setInterval(() => {
            if (alertList.length === 0) clearInterval(interval)
            removeAlert()
        }, 5000)
    }

    const removeAlert = () => {
        setAlertList((prevState) => {
            const newList = [...prevState]
            newList.shift()
            return newList
        })
    }

    const contextValue = {
        alertList,
        addAlert,
    }

    return (
        <AlertContext.Provider value={contextValue}>
            {children}
        </AlertContext.Provider>
    )
}

export default AlertContext
