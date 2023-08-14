'use client'
import Image, { ImageLoader } from 'next/image'
import FileUploader from '@/app/components/FileUploader'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useState } from 'react'

const getImages = () => {
    return axios({
        method: 'get',
        url: 'http://localhost:8080/api/image/getList',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
    })
}

const imageLoader: ImageLoader = ({ src, width, quality }) => {
    return src
}

export default function Grid() {
    const [imageList, setImageList] = useState<string[]>([])
    const query = useQuery({
        queryKey: ['imageList'],
        queryFn: getImages,
        onSuccess(data) {
            setImageList(data.data)
        },
        onError(err) {},
    })

    if (query.isLoading)
        return (
            <div className="flex justify-center items-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        )

    return (
        <section className={'flex flex-col h-full justify-between mx-10'}>
            <div className="grid grid-cols-5 grid-flow-row-dense gap-5 overflow-y-scroll scroll-smooth items-center">
                {imageList.map((item: string) => {
                    return (
                        <Image
                            key={item}
                            alt={'idx.toString()'}
                            width={500}
                            height={250}
                            unoptimized={true}
                            src={item}
                            loader={imageLoader}
                        />
                    )
                })}
            </div>
            <div className={'flex justify-end my-5'}>
                <FileUploader
                    onSent={(imagePath) => {
                        setImageList((e) => {
                            return [...e, imagePath]
                        })
                    }}
                />
            </div>
        </section>
    )
}
