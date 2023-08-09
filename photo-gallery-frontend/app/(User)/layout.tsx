import Providers from '../components/Providers'
import '../globals.css'
import Link from 'next/link'

export const metadata = {
    title: 'Authorization',
    description: 'Login or Register user',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    )
}
