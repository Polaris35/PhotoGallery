'use client'
import {ChangeEvent, useState} from "react";
import AlertPopup, {AlertType} from "@/app/components/AlertPopup";

export default function FileUploader()
{
    const [showPopup, setShowPopup] =
        useState(false);
    const onChoose = (event:ChangeEvent<HTMLInputElement>) => {

        if (!event.target.files)
            return;
        if(!event.target.files[0].type.includes('image'))
            setShowPopup(true);

        const selectedFile = event.target.files[0];
        console.log('Выбран файл:', selectedFile);
    }
    return (
        <>
            <input type={"file"} onChange={onChoose} className="file-input file-input-bordered file-input-accent w-full max-w-xs ml-auto mr-10"/>
            {/*<AlertPopup type={AlertType.warning} alertMessage={"file must be image"}/>*/}
        </>

    )
}