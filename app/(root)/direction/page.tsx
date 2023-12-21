"use client";

import SearchLocation from "@/components/location/SearchLocation";
import MapBox from "@/components/map/MapBox";
import { QueryProvider } from "@/lib/queries/QueryProvider";

const DirectionPage = () => {
  return (
    <div className="relative">
      <QueryProvider>
        <SearchLocation />
        <MapBox />
      </QueryProvider>
    </div>
  )
}

export default DirectionPage