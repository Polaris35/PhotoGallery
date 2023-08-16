'use client'
import { ChangeEvent, FormEvent, useContext, useState } from 'react'
import AlertContext from '@/app/components/Alert/AlertContext'
import { AlertType } from '@/app/components/Alert/AlertPopup'
import axios from 'axios'
import { useRouter } from 'next/navigation'

type Props = {
    onSent: (imgId: string, name: string) => void
}

export default function FileUploader(props: Props) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const { addAlert } = useContext(AlertContext)
    const router = useRouter()

    const onChoose = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) {
            setSelectedFile(null)
            return
        }
        if (!event.target.files[0].type.includes('image')) {
            addAlert(AlertType.warning, 'file must be image!')
            setSelectedFile(null)
            return
        }
        const selectedFile = event.target.files[0]
        setSelectedFile(selectedFile)
        console.log('Выбран файл:', selectedFile)
    }

    const onButtonClick = async (event: FormEvent) => {
        event.preventDefault()

        if (!selectedFile) {
            addAlert(AlertType.warning, 'file not selected')
            return
        }

        const formData = new FormData()
        console.log('отправляю файл')
        console.log(selectedFile)
        formData.append('selectedFile', selectedFile)
        try {
            const response = await axios({
                method: 'post',
                url: 'http://localhost:8080/api/image/upload',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem(
                        'authToken'
                    )}`,
                },
            })
            console.log(response.data)
            // if response == "ok" add this image to grid(use callback onSent)
            if (response.status === 401) router.push('/Login')
            if (response.status === 201)
                props.onSent(response.data.imgId, response.data.name)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <form className="flex gap-3 items-end" onSubmit={onButtonClick}>
            <input
                type={'file'}
                onChange={onChoose}
                className="file-input file-input-bordered file-input-accent w-full max-w-xs"
            />
            <button type="submit" className="btn btn-outline">
                send
            </button>
        </form>
    )
}
