"use server";

import { database } from "../database";
import { SortOptionsType } from './../../types/index';

export const fetchAllLocations = async (city: string, province: string) => {
  try {
    const allLocations = await database.business.findMany({
      skip: 40,
      take: 1000,
      where: {
        city_name: city,
        city_county_name: province
      },
    })

    return allLocations;
  } catch (error: any) {
    console.error("Failed to fetch locations", error.message);
  }
}

export async function fetchAllCities() {
  try {
    const allCities = await database.cities.findMany({})

    return allCities;
  } catch (error: any) {
    console.error("Failed to fetch cities", error.message);
  }
}

export async function fetchProvinceByCity(city: string) {
  try {
    const allProvinces = await database.provinces.findMany({
      where: {
        city_name: city
      }
    });
    return allProvinces;
  } catch (error: any) {
    console.error("Failed to fetch provinces", error.message);
  }
}

export async function fetchListLocation(pageSize = 10, pageNumber = 1, sortOption: SortOptionsType, searchParam: string) {
  try {
    console.log(123);
    
    const skipAmount = (pageNumber - 1) * pageSize;

    const allLocations = await database.business.findMany({
      skip: skipAmount,
      take: pageSize,
      where: {
        address: {
          contains: searchParam
        }
      },
      orderBy: [
        { [sortOption.field]: sortOption.order }
      ]
    });

    const totalLocationsCount = await database.business.count()
    return {
      allLocations,
      totalLocationsCount
    };
  } catch (error: any) {
    console.error("Failed to fetch locations", error.message);
  }
}