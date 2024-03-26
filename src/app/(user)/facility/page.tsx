import FacilityList from "@/components/Facility/FacilityList";
import SearchFacility from "@/components/Facility/SearchFacility";
import {
  getFacilitiesAction,
  getFacilitiesWithParamsAction,
} from "@/lib/actions/facilityAction";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Fasilitas",
  description: "facility page of kusuma bloom",
};

interface FacilityPageProps {
  searchParams: Record<string, string>;
}

const Page: React.FC<FacilityPageProps> = async ({ searchParams }) => {
  const facilities = await getFacilitiesWithParamsAction(
    "s" in searchParams ? searchParams.s : ""
  );

  return (
    <section className="container mb-28 mt-5 lg:mt-10">
      <div className="flex items-center flex-col md:flex-row justify-between mb-8 md:mb-0">
        <div className="mb-5 w-full lg:w-1/2">
          <p className="tracking-wider text-lg md:text-xl text-myOrange mb-2">
            FASILITAS KAMI
          </p>
          <div className="mb-5">
            <h3 className="font-bold text-2xl md:text-3xl text-primary mb-2 ">
              Ayo lihat <span className="text-primary">fasilitas</span> kami
            </h3>
            <div className="w-32">
              <div className="line bg-myOrange"></div>
            </div>
          </div>
        </div>
        <SearchFacility />
      </div>
      <FacilityList facilities={facilities.data} />
    </section>
  );
};

export default Page;
