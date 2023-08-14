'use client'
// import Image, { ImageLoader } from 'next/image'
import FileUploader from '@/app/components/FileUploader'
import { useEffect, useState } from 'react'

// const imageLoader: ImageLoader = ({ src, width, quality }) => {
//     return src
// }

export default function Grid() {
    const [imageList, setImageList] = useState<string[]>([])

    useEffect(() => {}, [])

    return (
        <section className={'flex flex-col h-full justify-between px-10'}>
            <div className="grid grid-cols-5 grid-flow-row-dense gap-5 overflow-y-scroll scroll-smooth">
                <img
                    alt={'image-1'}
                    // width={280}
                    // height={120}
                    // unoptimized={true}
                    src={
                        'http://localhost:8080/api/image/64d9a554944320f006cd9eb8'
                    }
                    // loader={imageLoader}
                />
            </div>
            <div className={'flex justify-end my-5'}>
                <FileUploader
                    onSent={(imagePath) => {
                        console.log(imagePath)
                    }}
                />
            </div>
        </section>
    )
}
