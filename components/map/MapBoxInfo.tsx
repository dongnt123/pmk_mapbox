import { secondsToHoursMinutes } from "@/lib/utils";
import { MapBoxRouteContentType } from "@/types";

const MapBoxRoute = ({ routeData }: { routeData: MapBoxRouteContentType }) => {

  return (
    <div className="absolute bottom-2 md:bottom-5 right-2 md:right-5 flex flex-col md:flex-row items-start md:items-center justify-end gap-1 md:gap-4
    p-2 md:p-4 bg-primary rounded-lg z-[10] w-fit text-sm md:text-base">
      <span className="capitalize text-md text-white">
        Distance: <span className="text-dark">{`${(routeData.distance / 1000).toFixed(2)}(km)`}</span>
      </span>
      <span className="capitalize text-md text-white">
        Duration: <span className="text-dark">{`${secondsToHoursMinutes(routeData.duration)}`}</span>
      </span>
    </div>
  )
}

export default MapBoxRoute