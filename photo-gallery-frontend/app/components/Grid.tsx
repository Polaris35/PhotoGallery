'use client'
import Image from 'next/image'
import FileUploader from '@/app/components/FileUploader'

export default function Grid() {
    return (
        <section className={'flex flex-col h-full justify-between px-10'}>
            <div className="grid grid-cols-5 grid-flow-row-dense gap-5 overflow-y-scroll scroll-smooth">
                <Image
                    alt={'image-1'}
                    width={280}
                    height={120}
                    src={'/image.jfif'}
                />
            </div>
            <div className={'flex justify-end my-5 px-10'}>
                <FileUploader onSent={() => {}} />
            </div>
        </section>
    )
}
