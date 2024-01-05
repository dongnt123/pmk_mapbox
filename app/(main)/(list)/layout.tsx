"use client";

import { QueryProvider } from '@/lib/queries/QueryProvider';

export default function ListLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      {children}
    </QueryProvider>
  )
}
