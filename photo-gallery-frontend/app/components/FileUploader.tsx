'use client'
import {ChangeEvent, useContext, useState} from "react";
import AlertContext from "@/app/components/Alert/AlertContext";
import {AlertType} from "@/app/components/Alert/AlertPopup";
import axios from "axios";


type Props = {
    onSent:()=>void;
}

export default function FileUploader(props: Props)
{
    const [selectedFile,setSelectedFile] =
        useState<File | null>(null);

    const {addAlert} = useContext(AlertContext);
    const onChoose = (event:ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) {
            setSelectedFile(null);
            return;
        }
        if(!event.target.files[0].type.includes('image')) {
            addAlert(AlertType.warning, "file must be image!");
            setSelectedFile(null);
            return;
        }
        const selectedFile = event.target.files[0];
        setSelectedFile(selectedFile);
        console.log('Выбран файл:', selectedFile);
    }
    const onButtonClick = ()=> {
        if(!selectedFile) {
            addAlert(AlertType.warning, "file not selected");
            return;
        }
        // send to server file
        const response = axios.post("http://localhost:8000/",{
            selectedFile
        });

        // if response == "ok" add this image to grid(use callback onSent)
    }
    return (
        <div>
            <input type={"file"} onChange={onChoose} className="file-input file-input-bordered file-input-accent w-full max-w-xs ml-auto mr-5"/>
            <button className="btn btn-outline" onClick={onButtonClick}>send</button>
        </div>
    );
}