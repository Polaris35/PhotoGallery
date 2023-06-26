'use client'
import Image from 'next/image'
import {useState} from "react";

type props = {
    alt:string;
    src:string;
    width: number;
    height: number;
}

export default function PhotoViewer(props: props) {
    const [isOpen, changeState] = useState(false);
    const onImgClick = ()=> {
        const state = !isOpen;
        changeState(state);
    }
    return <>
        <Image className={"rounded-2xl"} onClick={onImgClick} alt={props.alt} width={props.width} height={props.height} src={props.src}/>
        <div onClick={onImgClick} className=
                 {(`${isOpen ? "visible" : "invisible"} flex justify-center items-center 
                 fixed h-full w-full top-0 right-0 bg-base-200/60
                 `)}
        >
            <Image className={`${isOpen ? "visible" : "invisible"}`} src={props.src} alt={props.alt} width={props.width+200} height={props.height+100}/>
        </div>
    </>
}