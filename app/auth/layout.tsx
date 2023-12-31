import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import Image from 'next/image';

import '../globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: "--font-mont"
})

export const metadata: Metadata = {
  title: 'PMK Mapbox Auth',
  description: 'Authentication for PMK Mapbox',
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <main className='w-full h-screen flex'>
          <section className="flex flex-1 justify-center items-center flex-col p-4">
            {children}
          </section>
          <Image src="/images/side-img.svg" alt="Cover" width={800} height={800} className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat" />
        </main>
      </body>
    </html>
  )
}
