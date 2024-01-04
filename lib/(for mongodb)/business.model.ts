import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  commercial_business_number: {
    type: String,
    required: true,
    unique: true
  },
  business_name: {
    type: String,
    required: true
  },
  branch_name: {
    type: String,
    required: true
  },
  commercial_industry_classification_code_big: {
    type: String,
    required: true,
    index: true
  },
  commercial_industry_classification_name_big: {
    type: String,
    required: true
  },
  commercial_industry_classification_code_middle: {
    type: String,
    required: true
  },
  commercial_industry_classification_middle: {
    type: String,
    required: true
  },
  commercial_industry_classification_code_small: {
    type: String,
    required: true
  },
  commercial_industry_classification_name_small: {
    type: String,
    required: true
  },
  standard_industrial_classification_code: {
    type: String,
    required: true
  },
  standard_industrial_classification_name: {
    type: String,
    required: true
  },
  attempt_code: {
    type: String,
    required: true
  },
  city_name: {
    type: String,
    required: true,
    index: true
  },
  city_code: {
    type: String,
    length: 20,
    required: true
  },
  city_life_name: {
    type: String,
    required: true,
    index: true
  },
  administrative_building_code: {
    type: String,
    required: true
  },
  administrative_name: {
    type: String,
    required: true
  },
  legal_district_code: {
    type: String,
    required: true
  },
  legal_same_name: {
    type: String,
    required: true
  },
  address_code: {
    type: String,
    required: true
  },
  land_classification_code: {
    type: String,
    required: true
  },
  land_area_clear: {
    type: String,
    required: true
  },
  main_address_number: {
    type: String,
    required: true
  },
  address_number: {
    type: String
  },
  address: {
    type: String,
    required: true
  },
  road_name: {
    type: String,
    required: true
  },
  main_building_address: {
    type: String,
    required: true
  },
  sub_building_address: {
    type: String
  },
  building_management_number: {
    type: String,
    required: true
  },
  building_name: {
    type: String
  },
  street_name_address: {
    type: String,
    required: true
  },
  old_zip_code: {
    type: Number,
    required: true
  },
  new_zip_code: {
    type: Number,
    required: true
  },
  information: {
    type: String
  },
  floor_information: {
    type: String
  },
  ho_information: {
    type: String
  },
  longitude: {
    type: Number,
    required: true
  },
  latitude: {
    type: Number,
    required: true
  }
});

const Location = mongoose.models.Location || mongoose.model("Location", locationSchema);

export default Location;