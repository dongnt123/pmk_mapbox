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

export type LocationFullInfoType = {
  id: string;
  commercial_business_number: string;
  business_name: string;
  branch_name: string;
  commercial_industry_classification_code_big: string;
  commercial_industry_classification_name_big: string;
  commercial_industry_classification_code_middle: string;
  commercial_industry_classification_middle: string;
  commercial_industry_classification_code_small: string;
  commercial_industry_classification_name_small: string;
  standard_industrial_classification_code: string;
  standard_industrial_classification_name: string;
  attempt_code: string;
  city_name: string;
  city_code: string;
  city_life_name: string;
  administrative_building_code: string;
  administrative_name: string;
  legal_district_code: string;
  legal_same_name: string;
  address_code: string;
  land_classification_code: string;
  land_area_clear: string;
  main_address_number: string;
  address_number: string;
  address: string;
  road_name: string;
  main_building_address: string;
  sub_building_address: string;
  building_management_number: string;
  building_name: string;
  street_name_address: string;
  old_zip_code: Number;
  new_zip_code: Number;
  information: string;
  floor_information: string;
  ho_information: string;
  longitude: Number;
  latitude: Number;
}

export type ContentContextType = {
  menuSideBarStatus: boolean;
  setMenuSideBarStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

export type UserInfoType = {
  id: string;
  name: string;
  username: string;
  email: string;
  imageUrl: string;
};

export type AuthContextType = {
  user: UserInfoType;
  setUser: React.Dispatch<React.SetStateAction<UserInfoType>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
};