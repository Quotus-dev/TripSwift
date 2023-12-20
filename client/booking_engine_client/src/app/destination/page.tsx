"use client";


import React, { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import Header from "@/components/hotelListingComponents/Header";
import HotelCardDetails from "@/components/hotelListingComponents/HotelCardDetails";
import HotelMap from "@/components/hotelListingComponents/HotelMap";
import { hotelSearch } from "@/api/hotel";





const page = () => {
  const searchParams = useSearchParams()

  const [params, setParams] = useState({})

  const destination = searchParams.get("destination")
  const location = searchParams.get("location")

  console.log("params data", params)

  useEffect(() => {
    if (params && (params.location || params.destination)) {
      hotelSearch(params);
    }
  }, [params]);

  useEffect(() => {
    const updateParams = async () => {
      try {
        if (location) {
          setParams({ location: location, url: "search" });
        } else {
          setParams({ destination: destination, url: "search-amenities" });
        }
      } catch (error) {
        console.error("Error in updateParams:", error);
      }
    };
  
    updateParams();
  }, [destination, location]);


  return (
    <>
      <div className="flex flex-col items-stretch">
        <Header />
        <div className="bg-white w-full max-md:max-w-full">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
            <div className="flex flex-col items-stretch w-[58%] max-md:w-full max-md:ml-0">
              <div className="items-stretch self-stretch flex grow flex-col pt-10 px-10 max-md:max-w-full max-md:px-5">
                <div className="text-gray-500 text-base leading-6 whitespace-nowrap max-md:max-w-full">
                  200+ stays in Bordeaux
                </div>
                <div className="bg-gray-200 shrink-0 h-px mt-6 max-md:max-w-full" />
                <div className="mt-6 max-md:max-w-full">
                  <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
                    <HotelCardDetails />
                  </div>
                </div>
                <div className="bg-gray-200 shrink-0 h-px mt-6 max-md:max-w-full" />

                <div className="bg-gray-200 shrink-0 h-px mt-6 max-md:max-w-full" />
              </div>
            </div>
            <HotelMap />
          </div>
        </div>
      </div>
    </>
  )
}

export default page;