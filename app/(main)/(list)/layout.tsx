import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';

import '../globals.css';
import { Navbar } from '@/components/shared';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: "--font-mont"
})

export const metadata: Metadata = {
  title: 'PMK Mapbox',
  description: 'Find a place to become smokey!!',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Navbar />
        <main className='w-full h-[calc(100vh-60px)]'>
          {children}
        </main>
      </body>
    </html>
  )
}
