import { Skeleton } from '@/components/ui/skeleton';
import { ListTable } from './ListTable';

const ListTableContainer = () => {

  return (
    <div className="w-full px-[40px] flex flex-1">
      {true ? (
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
  )
}

export default ListTableContainer