import { SortOptionsType } from "@/types";
import { useQuery } from "@tanstack/react-query";

import { fetchAllCities, fetchAllLocations, fetchProvinceByCity, fetchListLocation } from "../actions/business.actions";
import { QUERY_KEYS } from "./queryKeys";

export const useFetchLocationData = (city: string, province: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_LOCATIONS, city, province],
    queryFn: () => fetchAllLocations(city, province),
    enabled: !!city && !!province
  })
}

export const usefetchAllCities = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_CITIES],
    queryFn: () => fetchAllCities()
  })
}

export const usefetchProvinceByCity = (city: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_PROVINCES, city],
    queryFn: () => fetchProvinceByCity(city),
    enabled: !!city
  })
}