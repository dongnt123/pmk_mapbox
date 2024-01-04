import { SortOptionsType } from '../../types/index';
"use server";

import Location from "./business.model";
import { connectDatabase } from "./mongoose";

export async function fetchAllLocations(city: string, province: string) {
  connectDatabase();
  try {
    const allLocation = await Location.find({
      "city_name": city,
      "city_life_name": province
    }).select("address city_name longitude latitude -_id")
      .limit(10);
    return JSON.parse(JSON.stringify(allLocation));
  } catch (error: any) {
    console.error("Failed to fetch locations", error.message);
  }
}

export async function fetchAllCities() {
  connectDatabase();
  try {
    const allCities = await Location.find()
      .distinct("city_name");
    return JSON.parse(JSON.stringify(allCities));
  } catch (error: any) {
    console.error("Failed to fetch cities", error.message);
  }
}

export async function fetchProvinceByCity(city: string) {
  connectDatabase();
  try {
    const allProvinces = await Location.find({ "city_name": city })
      .distinct("city_life_name");
    return JSON.parse(JSON.stringify(allProvinces));
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