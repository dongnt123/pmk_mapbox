"use client";

import AuthProvider from '@/context/AuthContext';
import LocationProvider from "@/context/LocationContext";
import ContentProvider from '@/context/ContentContext';
import { QueryProvider } from '@/lib/queries/QueryProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ContentProvider>
      <LocationProvider>
        <AuthProvider>
          <QueryProvider>
            {children}
          </QueryProvider>
        </AuthProvider>
      </LocationProvider>
    </ContentProvider>
  )
}
