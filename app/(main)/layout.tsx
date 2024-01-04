import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';

import '../globals.css';
import LocationProvider from "@/context/LocationContext";
import ContentProvider from '@/context/ContentContext';
import { Navbar } from '@/components/shared';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: "--font-mont"
})

export const metadata: Metadata = {
  title: 'PMK Mapbox',
  description: 'Find a place to become smokey!!',
}

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <ContentProvider>
      <LocationProvider>
          <html lang="en">
            <body className={montserrat.className}>
              <Navbar />
              <main className='w-full h-[calc(100vh-60px)]'>
                {children}
              </main>
            </body>
          </html>
      </LocationProvider>
    </ContentProvider>
  )
}
