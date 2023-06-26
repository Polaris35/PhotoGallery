'use client'
import {ChangeEvent, useContext} from "react";
import AlertContext from "@/app/components/Alert/AlertContext";
import {AlertType} from "@/app/components/Alert/AlertPopup";


export default function FileUploader()
{
    const {addAlert} = useContext(AlertContext);
    const onChoose = (event:ChangeEvent<HTMLInputElement>) => {

        if (!event.target.files)
            return;
        if(!event.target.files[0].type.includes('image'))
            addAlert(AlertType.warning, "file must be image!");

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