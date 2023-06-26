'use client'

import {useContext, useEffect, useState} from "react";
import AlertPopup, {AlertType,Alert} from "@/app/components/Alert/AlertPopup";
import AlertContext from "@/app/components/Alert/AlertContext";

function PopupStack() {
    const { alertList } = useContext(AlertContext);

    return (
        <ul className={"fixed bottom-2 right-2 max-h-80 scroll-auto"}>
                {alertList.map((item, idx)=> {
                    return <li key={idx}>
                        <AlertPopup type={item.type} alertMessage={item.alertMessage}/>
                    </li>
                })}
        </ul>
    )
}

export default PopupStack;