"use client";

import { Dispatch, SetStateAction } from "react";

import { travelOptions } from "@/constants";
import { useLocationContext } from "@/context/LocationContext";
import { CitySelect } from ".";
import { useContentContext } from "@/context/ContentContext";

type TravelOptionProps = {
  type: string;
  isActive: boolean;
  setTravelType: Dispatch<SetStateAction<string>>;
}

const TravelOption = ({ type, isActive, setTravelType }: TravelOptionProps) => (
  <div className={`flex justify-center items-center p-2 rounded-lg cursor-pointer border border-muted hover:bg-primary transition ease-linear duration-150
  hover:text-white capitalize text-sm md:text-base ${isActive && "bg-primary text-white"}`}
    onClick={() => setTravelType(type)}
  >
    {type === "driving-traffic" ? "traffic" : type}
  </div>
)

const SearchLocation = () => {

  const { destination, travelType, setTravelType } = useLocationContext();
  const { menuSideBarStatus } = useContentContext();

  return (
    <div className={`${menuSideBarStatus ? "md:left-[320px]" : "md:left-[20px]"} absolute top-0 md:top-5 -translate-x-1/2 md:-translate-x-0 left-1/2 z-[10] bg-white h-fit w-full md:w-[350px]
    md:rounded-lg p-4 md:border border-dark flex flex-col justify-start items-start gap-2 md:gap-3 transition-all ease-in-out duration-500`}>
      {destination !== "" && (
        <div className="w-full flex flex-col gap-1 md:gap-3">
          <h2 className="text-sm md:text-base text-dark font-bold capitalize">Destination Location</h2>
          <p className="mt-1 md:mt-3 w-full p-2 md:p-4 border border-dark rounded-lg flex justify-center items-center text-sm md:text-base">{destination}</p>
          <div className="mt-2 md:mt-4 flex justify-between items-center w-full">
            {travelOptions.map((travel) => (
              <TravelOption key={travel.type} type={travel.type} isActive={travelType === travel.type} setTravelType={setTravelType} />
            ))}
          </div>
        </div>
      )}
      <h2 className="text-sm md:text-base text-dark font-bold capitalize">Select region</h2>
      <CitySelect />
    </div>
  )
}

export default SearchLocation