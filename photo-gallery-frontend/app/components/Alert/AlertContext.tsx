'use client'
import {createContext, ReactNode, useState} from "react";
import {Alert, AlertType} from "@/app/components/Alert/AlertPopup";

interface AlertContextProps {
    alertList: Alert[];
    addAlert: (type: AlertType, alertMessage: string) => void;
    removeAlert: () => void;
}

const AlertContext = createContext<AlertContextProps>({
    alertList: [],
    addAlert: (type, alertMessage) => {
    },
    removeAlert: () => {
    },
});


export const AlertProvider = ({ children }:{ children: ReactNode }) => {
    const [alertList, setAlertList] = useState<Alert[]>([]);

    const addAlert = (type:AlertType, alertMessage:string) => {
        setAlertList([...alertList, { type, alertMessage }]);
        const interval = setInterval(()=>{
            if(alertList.length === 0)
                clearInterval(interval);

            removeAlert();
        },5000);
    };

    const removeAlert = () => {
        setAlertList((prevState) => {
            const newList = [...prevState];
            newList.shift();
            return newList;
        });
    };

    const contextValue = {
        alertList,
        addAlert,
        removeAlert,
    };

    return (
        <AlertContext.Provider value={contextValue}>
            {children}
        </AlertContext.Provider>
    );
};

export default AlertContext;