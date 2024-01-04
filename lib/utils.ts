import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import { business } from "@prisma/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function secondsToHoursMinutes(seconds: number) {
  if (seconds < 3600) {
    const minutes = seconds / 60;
    return `${minutes.toFixed(2)} (minutes)`;
  } else {
    const hours = seconds / 3600;
    return `${hours.toFixed(2)} (hours)`;
  }
}

export function converLocationInfoData(data: business[] | undefined) {
  if (data) {
    const convertedData = data?.map((location) => (
      {
        "type": "Feature",
        "properties": location,
        "geometry": {
          "type": "Point",
          "coordinates": [
            location.longitude,
            location.latitude,
            0.0
          ]
        }
      }
    ));
    return convertedData;
  } else {
    return [
      {
        "type": "Feature",
        "properties": "",
        "geometry": {
          "type": "Point",
          "coordinates": [
            0,
            0,
            0.0
          ]
        }
      }
    ]
  }

}

export function getCenterLocation(data: business[] | undefined) {
  const sumCenterPositon = data?.reduce((centerPoint, location) => {
    return {
      ...centerPoint,
      sumLong: Number(location.longitude) + centerPoint.sumLong,
      sumLat: Number(location.latitude) + centerPoint.sumLat,
    }
  }, {
    sumLong: 0,
    sumLat: 0
  })
  if (sumCenterPositon && data) {
    return {
      longitude: (sumCenterPositon.sumLong / data.length) || 0,
      latitude: (sumCenterPositon.sumLat / data.length) || 0,
    }
  } else {
    return {
      longitude: 0,
      latitude: 0,
    }
  }
}