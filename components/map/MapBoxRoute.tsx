import { MapBoxRouteContentType } from "@/types";
import { Layer, Source } from "react-map-gl";


const MapBoxRoute = ({ routeData }: { routeData: MapBoxRouteContentType }) => {

  return (
    <Source
      type='geojson'
      data={{
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: routeData.route
        },
        properties: {}
      }}
    >
      <Layer
        type='line'
        layout={{ 'line-join': 'round', 'line-cap': 'square' }}
        paint={{ 'line-color': '#0462D4', 'line-width': 4 }}
      />
    </Source>
  )
}

export default MapBoxRoute