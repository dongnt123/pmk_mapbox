"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { LocationContextType, LocationType, PositionType } from "@/types";

const INITIAL_USER_LOCATION = {
  latitude: 0,
  longitude: 0
}

const INITIAL_MAP_POSITION = {
  city: "강원특별자치도",
  province: "동해시"
}

export const INITIAL_STATE = {
  userLocation: INITIAL_USER_LOCATION,
  destination: "",
  travelType: "driving-traffic",
  position: INITIAL_MAP_POSITION,
  setUserLocation: () => { },
  setDestination: () => { },
  setTravelType: () => { },
  setPosition: () => { }
}

const LocationContext = createContext<LocationContextType>(INITIAL_STATE);

const LocationProvider = ({ children }: { children: React.ReactNode }) => {

  const [userLocation, setUserLocation] = useState<LocationType>(INITIAL_USER_LOCATION);
  const [position, setPosition] = useState<PositionType>(INITIAL_MAP_POSITION);
  const [destination, setDestination] = useState("");
  const [travelType, setTravelType] = useState("driving-traffic");

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition((pos: GeolocationPosition) => {
      setUserLocation({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      })
    })
  }

  useEffect(() => {
    getUserLocation();
  }, [])

  const value = {
    userLocation,
    destination,
    travelType,
    position,
    setUserLocation,
    setDestination,
    setTravelType,
    setPosition
  }

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  )
}

export default LocationProvider;

export const useLocationContext = () => useContext(LocationContext);