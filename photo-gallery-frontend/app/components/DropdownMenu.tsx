'use client'
import { useState, useEffect, useRef, PropsWithChildren } from 'react'

const DropdownMenu = ({ children }: PropsWithChildren) => {
    const [isOpen, setIsOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement | null>(null)

    const handleClickOutside = (event: Event) => {
        const target = event.target as Node
        if (menuRef.current && !menuRef.current.contains(target)) {
            setIsOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <div className="relative inline-block" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="btn btn-circle btn-ghost"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                >
                    {' '}
                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />{' '}
                </svg>
            </button>

            {isOpen && (
                <div className="flex flex-col items-start z-10 absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-base-200 ring-1 ring-black ring-opacity-5">
                    {children}
                </div>
            )}
        </div>
    )
}

export default DropdownMenu
