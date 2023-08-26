'use client'
import Image, { ImageLoader } from 'next/image'
import DropdownMenu from './DropdownMenu'
import { FormEvent, useState } from 'react'
import axios from 'axios'

type Props = {
    imgId: string
    name: string
    onImageClick: () => void
    onDeleted: () => void
    onRenamed: (newName: string) => void
}

const imageLoader: ImageLoader = ({ src, width, quality }) => {
    return src
}
axios.defaults.baseURL = 'http://localhost:8080/api'

function ImageCard(props: Props) {
    const [newName, setNewName] = useState(props.name)
    const onDeleteClick = async (imgId: string) => {
        console.log('delete ' + imgId)
        const response = await axios({
            // baseURL: 'http://localhost:8080/api'
            url: '/image/delete',
            method: 'delete',
            params: {
                imgId: props.imgId,
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
        })
        if (response.status == 200) props.onDeleted()
    }

    const onRenameClick = async () => {
        console.log('rename : ' + props.imgId)
        console.log('from ' + props.name + ' to ' + newName)
        const response = await axios({
            // baseURL: 'http://localhost:8080/api'
            url: '/image/rename',
            method: 'put',
            params: {
                imgId: props.imgId,
                newName: newName,
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
        })
        if (response.status === 200) props.onRenamed(newName)
    }

    return (
        <div className="card bg-base-100 shadow-xl h-64 rounder-lg">
            <figure className="h-full flex justify-center items-center">
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
            </figure>
            <div className="flex items-center p-2 justify-between">
                <span className="truncate">{props.name}</span>
                <DropdownMenu>
                    <button
                        className="flex justify-between items-center w-full p-2 text-red-300 text-lg hover:bg-base-100 rounded-t-lg"
                        onClick={() => window.delete_modal.showModal()}
                    >
                        <span>Delete</span>
                        <svg
                            width={25}
                            height={25}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 1024 1024"
                            fill="currentColor"
                            // className=" right-0"
                        >
                            <path d="M352 192V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64H96a32 32 0 0 1 0-64h256zm64 0h192v-64H416v64zM192 960a32 32 0 0 1-32-32V256h704v672a32 32 0 0 1-32 32H192zm224-192a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32zm192 0a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32z" />
                        </svg>
                    </button>
                    <dialog id="delete_modal" className="modal">
                        <form method="dialog" className="modal-box">
                            <h3 className="py-4 font-bold text-lg mb-2">
                                Are you sure you want to delete{' '}
                                <span className="text-accent">
                                    {props.name}
                                </span>
                            </h3>
                            <div className="flex justify-between">
                                <button
                                    className="text-red-600 btn"
                                    onClick={() => {
                                        onDeleteClick(props.imgId)
                                    }}
                                >
                                    Yes
                                </button>
                                <button className="btn">No</button>
                            </div>
                        </form>
                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>

                    <button
                        className="flex justify-between items-center w-full p-2 text-green-300 text-lg hover:bg-base-100 rounded-b-lg"
                        onClick={() => window.rename_modal.showModal()}
                    >
                        Rename
                        <svg
                            width={32}
                            height={32}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M18.41 5.8L17.2 4.59c-.78-.78-2.05-.78-2.83 0l-2.68 2.68L3 15.96V20h4.04l8.74-8.74 2.63-2.63c.79-.78.79-2.05 0-2.83zM6.21 18H5v-1.21l8.66-8.66 1.21 1.21L6.21 18zM11 20l4-4h6v4H11z"></path>
                        </svg>
                    </button>
                    <dialog id="rename_modal" className="modal">
                        <form method="dialog" className="modal-box">
                            <h3 className="py-4 font-bold text-lg mb-2">
                                input new name
                            </h3>
                            <div className="flex flex-col py-2">
                                <div>
                                    <input
                                        type="text"
                                        onChange={(e) => {
                                            setNewName(e.target.value)
                                        }}
                                        value={newName}
                                        className="input w-full"
                                    />
                                </div>
                                <div className="flex justify-between mt-5">
                                    <button
                                        className="btn"
                                        onClick={onRenameClick}
                                    >
                                        Submit
                                    </button>
                                    <button
                                        onClick={() => {
                                            setNewName(props.name)
                                            window.rename_modal.close()
                                        }}
                                        className="btn"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </form>
                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>
                </DropdownMenu>
            </div>
        </div>
    )
}

export default ImageCard
