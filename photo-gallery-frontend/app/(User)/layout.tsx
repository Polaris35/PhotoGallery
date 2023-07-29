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
      <section>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          {children}
        </div>
      </section>
      </body>
    </html>
  )
}
