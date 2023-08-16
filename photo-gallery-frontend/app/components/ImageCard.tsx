'use client'
import Image, { ImageLoader } from 'next/image'

type Props = {
    imgId: string
    name: string
    onImageClick: () => void
}

const imageLoader: ImageLoader = ({ src, width, quality }) => {
    return src
}

function ImageCard(props: Props) {
    return (
        <div className="card bg-base-100 shadow-xl h-64">
            <Image
                alt={props.imgId}
                width={500}
                height={250}
                unoptimized={true}
                src={`http://localhost:8080/api/image/image/${
                    props.imgId
                }/${localStorage.getItem('authToken')}`}
                loader={imageLoader}
                className="w-auto h-full object-cover"
                onClick={props.onImageClick}
            />
            <div className="flex items-center p-2 justify-between md:">
                <span className="truncate">{props.name}</span>
                <button className="btn btn-circle btn-ghost">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-three-dots-vertical"
                        viewBox="0 0 16 16"
                    >
                        {' '}
                        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />{' '}
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default ImageCard
