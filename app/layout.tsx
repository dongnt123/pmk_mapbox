import AuthProvider from '@/context/AuthContext';
import LocationProvider from "@/context/LocationContext";
import ContentProvider from '@/context/ContentContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ContentProvider>
      <LocationProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </LocationProvider>
    </ContentProvider >
  )
}
