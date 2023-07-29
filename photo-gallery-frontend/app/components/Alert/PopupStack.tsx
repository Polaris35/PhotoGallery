'use client'

import { useContext, useEffect, useState } from 'react'
import AlertPopup, { AlertType, Alert } from '@/app/components/Alert/AlertPopup'
import AlertContext from '@/app/components/Alert/AlertContext'

function PopupStack() {
    const { alertList } = useContext(AlertContext)

    return (
        <div className={'fixed bottom-2 right-2 max-h-80 flex flex-col gap-2'}>
            {alertList.map((item, idx) => {
                // console.log(alertList.length);
                return (
                    <AlertPopup
                        key={idx}
                        type={item.type}
                        alertMessage={item.alertMessage}
                    />
                )
            })}
        </div>
    )
}

export default PopupStack
