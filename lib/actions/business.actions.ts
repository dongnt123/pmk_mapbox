"use server";

import Location from "../models/Business.model";
import { connectDatabase } from "../mongoose";

export async function fetchAllLocations(city: string, province: string) {
  connectDatabase();
  try {
    const allLocation = await Location.find({
      "city_name": city,
      "city_life_name": province
    }).select("address city_name longitude latitude -_id")
      .limit(600);
    return JSON.parse(JSON.stringify(allLocation));
  } catch (error: any) {
    console.error("Failed to fetch posts", error.message);
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