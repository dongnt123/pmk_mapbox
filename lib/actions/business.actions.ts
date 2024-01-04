"use server";

import { database } from "../database";
import Location from "../(for mongodb)/business.model";
import { connectDatabase } from "../(for mongodb)/mongoose";
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

export async function fetchListLocation(pageSize: number, pageNumber = 1, sortOption: SortOptionsType, searchParam = "") {
  connectDatabase();
  try {

    const skipAmount = (pageNumber - 1) * pageSize;
    console.log(pageSize, pageNumber, sortOption, searchParam);

    const allLocationsQuery = searchParam !== "" ? Location.find({ "street_name_address": { $regex: '.*' + searchParam + '.*' } }) : Location.find();
    allLocationsQuery.sort({ [sortOption.field]: sortOption.order })
      .skip(skipAmount)
      .limit(pageSize);

    const totalLocationsCount = await Location.countDocuments();
    const locations = await allLocationsQuery.exec();
    const isNext = totalLocationsCount > skipAmount + locations.length;
    console.log(locations);
    return JSON.parse(JSON.stringify({
      locations,
      totalLocationsCount,
      isNext
    }));
  } catch (error: any) {
    console.error("Failed to fetch locations", error.message);
  }
}