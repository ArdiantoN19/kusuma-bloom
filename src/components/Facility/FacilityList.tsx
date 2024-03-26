import { ResponseFacility } from "@/types/facilityAction";
import React from "react";
import FacilityItem from "./FacilityItem";
import { SmileyXEyes } from "@phosphor-icons/react/dist/ssr";

interface FacilityListProps {
  facilities: Readonly<ResponseFacility[]>;
}

const FacilityList: React.FC<FacilityListProps> = ({ facilities }) => {
  if (!facilities.length) {
    return (
      <div className="min-h-[55dvh] w-full flex items-center justify-center flex-col gap-2">
        <SmileyXEyes size={102} className="text-primary" />
        <h2 className="text-center text-lg">Fasilitas tidak ditemukan</h2>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {facilities.map((facility: ResponseFacility) => (
        <FacilityItem key={facility.id} {...facility} />
      ))}
    </div>
  );
};

export default FacilityList;
