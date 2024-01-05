"use client";

import SearchLocation from "@/components/location/SearchLocation";
import MapBox from "@/components/map/MapBox";
import { LeftSideBar } from "@/components/shared";
import { useContentContext } from "@/context/ContentContext";
import { QueryProvider } from '@/lib/queries/QueryProvider';

export default function HomePage() {

  const { menuSideBarStatus } = useContentContext();

  return (
    <QueryProvider>
      <div className="relative w-full h-full">
        <div className={`${menuSideBarStatus ? "-translate-x-[0]" : "-translate-x-[500px] md:-translate-x-[300px]"} fixed md:absolute w-[300px] h-[400px] md:h-full transition-all ease-in-out
          duration-500 z-[20] md:z-[10] bg-light top-[70px] md:top-0 left-2 md:left-0 md:border-r rounded-lg md:rounded-none shadow-md md:shadow-none`}>
          <LeftSideBar />
        </div >
        <SearchLocation />
        <MapBox />
      </div>
    </QueryProvider>
  )
}
