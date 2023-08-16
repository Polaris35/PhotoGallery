'use client'

import FileUploader from '@/app/components/FileUploader'
import { useQuery } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { useCallback, useContext, useState } from 'react'
import ImageViewer from 'react-simple-image-viewer'
import { useRouter } from 'next/navigation'
import { AlertType } from './Alert/AlertPopup'
import AlertContext from './Alert/AlertContext'
import ImageCard from './ImageCard'

const getImages = () => {
    return axios({
        method: 'get',
        url: 'http://localhost:8080/api/image/getList',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
    })
}

export default function Grid() {
    const [imageList, setImageList] = useState<
        { imgId: string; name: string }[]
    >([])
    const [currentImage, setCurrentImage] = useState(0)
    const [isViewerOpen, setIsViewerOpen] = useState(false)
    const { addAlert } = useContext(AlertContext)

    const router = useRouter()

    const query = useQuery({
        queryKey: ['imageList'],
        queryFn: getImages,
        onSuccess(data) {
            setImageList(data?.data)
        },
        onError(err: AxiosError) {
            if (err.response?.status === 401) {
                addAlert(AlertType.info, 'authorization timed out')
                router.push('/Login')
            }
        },
    })

    const openImageViewer = useCallback((index: number) => {
        setCurrentImage(index)
        setIsViewerOpen(true)
    }, [])

    const closeImageViewer = () => {
        setCurrentImage(0)
        setIsViewerOpen(false)
    }

    if (query.isLoading)
        return (
            <div className="flex justify-center items-center h-full">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        )

    return (
        <section className={'flex flex-col min-h-full justify-between mx-16'}>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 grid-flow-row-dense gap-5 overflow-y-scroll scroll-smooth items-center">
                {imageList.map((item, index: number) => {
                    return (
                        <ImageCard
                            key={item.imgId}
                            imgId={item.imgId}
                            name={item.name}
                            onImageClick={() => openImageViewer(index)}
                        />
                    )
                })}
                {isViewerOpen && (
                    <ImageViewer
                        src={imageList.map((item) => {
                            return `http://localhost:8080/api/image/image/${
                                item.imgId
                            }/${localStorage.getItem('authToken')}`
                        })}
                        currentIndex={currentImage}
                        onClose={closeImageViewer}
                        disableScroll={false}
                        backgroundStyle={{
                            backgroundColor: 'rgba(0,0,0,0.9)',
                        }}
                        closeOnClickOutside={true}
                    />
                )}
            </div>
            <div className={'flex justify-end my-5'}>
                <FileUploader
                    onSent={(imgId: string, name: string) => {
                        setImageList((e) => {
                            return [...e, { imgId: imgId, name: name }]
                        })
                    }}
                />
            </div>
        </section>
    )
}
