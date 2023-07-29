import Providers from '../components/Providers';
import '../globals.css'
import Link from "next/link";

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
        <Providers>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div
            className="w-full rounded-lg shadow bg-primary-content border-neutral dark:border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            {children}
            </div>
            </div>
            </div>
        </Providers>
      </body>
    </html>
  )
}
