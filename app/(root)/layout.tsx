import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';

import LocationProvider from "@/context/LocationContext";
import '../globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: "--font-mont"
})

export const metadata: Metadata = {
  title: 'PMK Mapbox',
  description: 'Mapbox description',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <LocationProvider>
        <body className={montserrat.className}>{children}</body>
      </LocationProvider>
    </html>
  )
}
