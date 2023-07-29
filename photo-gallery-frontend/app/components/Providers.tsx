'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { AlertProvider } from './Alert/AlertContext'
import PopupStack from './Alert/PopupStack'

export default function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient())

    return (
        <QueryClientProvider client={queryClient}>
            <AlertProvider>
                {children}
                <PopupStack />
            </AlertProvider>
        </QueryClientProvider>
    )
}
