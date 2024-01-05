import { business } from "@prisma/client";

import { LeftSideBar } from "@/components/shared";
import { Skeleton } from "@/components/ui/skeleton";
import { useContentContext } from "@/context/ContentContext";
import { ListTable } from "../_components/ListTable";
import { fetchListLocation } from "@/lib/actions/business.actions";

const ListPage = () => {

  const { menuSideBarStatus } = useContentContext();


  return (
    <div className={`${menuSideBarStatus ? "-translate-x-[0] w-full gap-x-2" : "-translate-x-[500px] md:-translate-x-[300px] w-[calc(100%+300px)] gap-x-0"} relative h-full transition-all ease-in-out duration-500 flex`}>
      <div className="w-[300px] h-full border-r drop-shadow-md">
        <LeftSideBar />
      </div>
      <div className="w-full px-[40px] flex flex-1">
        {false ? (
          <div className="pt-10 w-full h-full flex flex-col gap-4">
            <div className="w-full flex justify-between items-center">
              <Skeleton className="w-[400px] h-[50px]"></Skeleton>
              <Skeleton className="w-[200px] h-[50px]"></Skeleton>
            </div>
            <div className="w-full flex flex-col gap-2">
              <Skeleton className="w-full h-[50px]"></Skeleton>
              <Skeleton className="w-full h-[50px]"></Skeleton>
              <Skeleton className="w-full h-[50px]"></Skeleton>
              <Skeleton className="w-full h-[50px]"></Skeleton>
              <Skeleton className="w-full h-[50px]"></Skeleton>
              <Skeleton className="w-full h-[50px]"></Skeleton>
            </div>
            <div className="w-full flex justify-end pt-2 items-center gap-4">
              <Skeleton className="w-[100px] h-[50px]"></Skeleton>
              <Skeleton className="w-[100px] h-[50px]"></Skeleton>
            </div>
          </div>
        ) : (
          <ListTable />
        )}
      </div>
    </div>
  )
}

export default ListPage