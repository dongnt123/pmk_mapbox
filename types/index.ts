export type SortOptionsType = {
  field: string;
  order: "asc" | "desc";
}

export type LocationType = {
  latitude: number;
  longitude: number;
}

export type PositionType = {
  city: string;
  province: string;
}

export type LocationContextType = {
  userLocation: LocationType;
  destination: string;
  travelType: string | "driving-traffic" | "driving" | "walking" | "cycling";
  position: PositionType;
  setUserLocation: React.Dispatch<React.SetStateAction<LocationType>>;
  setDestination: React.Dispatch<React.SetStateAction<string>>;
  setTravelType: React.Dispatch<React.SetStateAction<string>>;
  setPosition: React.Dispatch<React.SetStateAction<PositionType>>;
}

export type MapBoxRouteContentType = {
  route: number[][];
  distance: number;
  duration: number;
}

export type ContentContextType = {
  menuSideBarStatus: boolean;
  setMenuSideBarStatus: React.Dispatch<React.SetStateAction<boolean>>;
}