"use client";

import SearchLocation from "@/components/location/SearchLocation";
import MapBox from "@/components/map/MapBox";
import { QueryProvider } from "@/lib/queries/QueryProvider";

export default function Home() {
  return (
    <div className="relative w-full flex-1">
      <QueryProvider>
        <SearchLocation />
        <MapBox />
      </QueryProvider>
    </div>
  )
}
