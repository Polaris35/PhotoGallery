'use client'

import {useEffect, useState} from "react";
import {AlertType,Alert} from "@/app/components/AlertPopup";

function PopupStack() {
    const [alertList,
        setAlertList] = useState<Alert[]>([]);
    useEffect(()=>
    {
        setInterval(()=>{
            
        },5000)
    },[alertList]);
    const addPopup = (type:AlertType, alertMessage: string) =>
    {
        setAlertList([...alertList,{type, alertMessage}]);
    }
    const deletePopup = (idx:number) => {
        setAlertList((e) => e.filter((_, index) => index !== idx));
    };


}