import { Layer, Source } from "react-map-gl";
import { useEffect, useState } from "react";

import { converLocationInfoData, getCenterLocation } from '@/lib/utils';
import { useFetchLocationData } from "@/lib/queries/queriesAndMutations";
import { useLocationContext } from "@/context/LocationContext";
import { MapLoader } from ".";
import { LocationFullInfoType } from "@/types";

const MapBoxLocation = ({ mapRef }: { mapRef: any }) => {

  const { position } = useLocationContext();
  const { data: locations, isFetching: isLoadingLocation } = useFetchLocationData(position.city, position.province);
  const [allLocation, setAllLocation] = useState<LocationFullInfoType[]>();

  useEffect(() => {
    if (locations) {
      setAllLocation(locations);
      const centerPosition = getCenterLocation(locations);
      mapRef.current.flyTo({
        center: [centerPosition.longitude, centerPosition.latitude],
        zoom: 12,
        duration: 2500
      })
    }
  }, [locations])

  return (
    <>
      {isLoadingLocation && <MapLoader />}
      <Source
        id='earthquakes'
        type='geojson'
        data={{
          "type": "FeatureCollection",
          "crs": {
            "type": "name",
            "properties": {
              "name": "urn:ogc:def:crs:OGC:1.3:CRS84"
            }
          },
          // @ts-ignore
          "features": converLocationInfoData(allLocation)
        }}
        cluster={true}
        clusterMaxZoom={14}
        clusterRadius={50}
      >
        <Layer
          id='clusters'
          type='circle'
          source='earthquakes'
          filter={['has', 'point_count']}
          paint={{
            'circle-color': ['step', ['get', 'point_count'], '#51BBD6', 100, '#F1F075', 750, '#F28CB1'],
            'circle-radius': ['step', ['get', 'point_count'], 30, 100, 50, 750, 40]
          }}
        />
        <Layer
          id='cluster-count'
          type='symbol'
          source='earthquakes'
          filter={['has', 'point_count']}
          layout={{
            'text-field': ['get', 'point_count_abbreviated'],
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 15
          }}
        />
        <Layer
          id='unclustered-point'
          type='circle'
          source='earthquakes'
          filter={['!', ['has', 'point_count']]}
          paint={{
            'circle-color': '#11B4DA',
            'circle-radius': 20,
            'circle-stroke-width': 3,
            'circle-stroke-color': '#FFFFFF'
          }}
        />
      </Source>
    </>

  )
}

export default MapBoxLocation;
