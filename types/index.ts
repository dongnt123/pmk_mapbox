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
  id: String;
  commercial_business_number: String;
  business_name: String;
  branch_name: String;
  commercial_industry_classification_code_big: String;
  commercial_industry_classification_name_big: String;
  commercial_industry_classification_code_middle: String;
  commercial_industry_classification_middle: String;
  commercial_industry_classification_code_small: String;
  commercial_industry_classification_name_small: String;
  standard_industrial_classification_code: String;
  standard_industrial_classification_name: String;
  attempt_code: String;
  city_name: String;
  city_code: String;
  city_life_name: String;
  administrative_building_code: String;
  administrative_name: String;
  legal_district_code: String;
  legal_same_name: String;
  address_code: String;
  land_classification_code: String;
  land_area_clear: String;
  main_address_number: String;
  address_number: String;
  address: String;
  road_name: String;
  main_building_address: String;
  sub_building_address: String;
  building_management_number: String;
  building_name: String;
  street_name_address: String;
  old_zip_code: Number;
  new_zip_code: Number;
  information: String;
  floor_information: String;
  ho_information: String;
  longitude: Number;
  latitude: Number;
}