"use client";

import Map, { Marker, NavigationControl, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { useLocationContext } from '@/context/LocationContext';
import { MapBoxRouteContentType, LocationType, LocationFullInfoType } from '@/types';
import { MapBoxInfo, MapBoxLocation, MapBoxRoute } from '.';
import { Skeleton } from "@/components/ui/skeleton";


const MapBox = () => {

  const { userLocation, travelType, setDestination } = useLocationContext();

  const mapRef = useRef<any>(null);
  const [newLocation, setNewLocation] = useState<LocationType>({
    latitude: 0,
    longitude: 0
  });
  const [popupLocation, setPopupLocation] = useState<LocationType>({
    latitude: 0,
    longitude: 0
  });
  const [routeData, setRouteData] = useState<MapBoxRouteContentType>();
  const [isShowPopup, setIsShowPopup] = useState<boolean>(false);
  const [isShowRoute, setIsShowRoute] = useState<boolean>(false);
  const [popupData, setPopupData] = useState<LocationFullInfoType>()

  const handleChooseLocation = (e: mapboxgl.MapLayerMouseEvent) => {
    // For clusters layer
    const clusterFeatures = mapRef.current.queryRenderedFeatures(e.point, {
      layers: ['clusters']
    });
    if (clusterFeatures[0]) {
      const clusterId = clusterFeatures[0].properties.cluster_id;
      mapRef.current.getSource('earthquakes').getClusterExpansionZoom(
        clusterId,
        (err: string, zoom: number) => {
          if (err) return;

          mapRef.current.easeTo({
            center: clusterFeatures[0].geometry.coordinates,
            zoom: zoom
          });
        }
      );
    }
    // For point layer
    const pointFeatures = mapRef.current.queryRenderedFeatures(e.point, {
      layers: ['unclustered-point']
    });
    if (pointFeatures[0]) {
      setNewLocation({
        latitude: e.lngLat.lat,
        longitude: e.lngLat.lng,
      });
      mapRef.current.flyTo({
        center: [userLocation.longitude, userLocation.latitude],
        duration: 2500
      })
      setIsShowRoute(true);
      setDestination(pointFeatures[0].properties.address)
    }
  }

  const handleMouseEnter = (e: mapboxgl.MapLayerMouseEvent) => {
    mapRef.current.getCanvas().style.cursor = 'pointer';
    const pointFeatures = mapRef.current.queryRenderedFeatures(e.point, {
      layers: ['unclustered-point']
    });
    if (pointFeatures[0]) {
      setIsShowPopup(true);
      setPopupLocation({
        latitude: e.lngLat.lat,
        longitude: e.lngLat.lng,
      });
      setPopupData(pointFeatures[0].properties);
    }
  }

  const handleMouseLeave = (e: mapboxgl.MapLayerMouseEvent) => {
    mapRef.current.getCanvas().style.cursor = '';
    setIsShowPopup(false);
  }

  useEffect(() => {
    const handleUpdateRoute = async () => {
      if (newLocation.latitude !== 0) {
        const resultRoute = await fetch(`https://api.mapbox.com/directions/v5/mapbox/${travelType}/${userLocation.longitude},${userLocation.latitude};${newLocation.longitude},${newLocation.latitude}?overview=full&geometries=geojson&access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        const routeDataResult = await resultRoute.json();

        setRouteData(prevState => ({
          ...prevState,
          duration: routeDataResult?.routes ? routeDataResult.routes[0].duration : 0,
          distance: routeDataResult?.routes ? routeDataResult.routes[0].distance : 0,
          route: routeDataResult?.routes ? routeDataResult.routes[0].geometry.coordinates : {},
        }));
      }
    }

    handleUpdateRoute();
  }, [travelType, newLocation])

  return (
    <div className="w-full h-full flex flex-1 justify-center items-center">
      {userLocation.latitude !== 0 ? (
        <Map
          ref={mapRef}
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
          initialViewState={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            zoom: 10
          }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          onClick={handleChooseLocation}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          interactiveLayerIds={["clusters", "cluster-count", "unclustered-point"]}
        >
          <NavigationControl />
          <Marker longitude={userLocation.longitude} latitude={userLocation.latitude} anchor="bottom" >
            <Image src="/icons/location.png" alt="Pin" width={25} height={33} />
          </Marker>
          {userLocation.latitude !== 0 && isShowRoute && (
            <Marker longitude={newLocation.longitude} latitude={newLocation.latitude} anchor="bottom" >
              <Image src="/icons/location.png" alt="Pin" width={25} height={33} />
            </Marker>
          )}
          {routeData && isShowRoute && <MapBoxRoute routeData={routeData} />}
          {isShowPopup && (
            <Popup
              longitude={popupLocation.longitude}
              latitude={popupLocation.latitude}
              anchor="bottom"
              onClose={() => setIsShowPopup(false)}
              className="w-[400px] h-fit rounded-lg p-4"
              closeButton={false}
            >
              {popupData?.address}
            </Popup>)}
          <MapBoxLocation mapRef={mapRef} />
        </Map>
      ) : (
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      )}
      {routeData && isShowRoute && <MapBoxInfo routeData={routeData} />}
    </div>
  )
}

export default MapBox