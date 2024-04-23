import React from "react";
import Carousel from "../Carousel";
import FacilityCarouselItem from "./FacilityCarouselItem";
import { getFacilitiesAction } from "@/lib/actions/facilityAction";
import Image from "next/image";
import { ResponseFacility } from "@/types/facilityAction";

const FacilityCarousel = async () => {
  const facilities = await getFacilitiesAction();
  const currentFacilities = facilities?.data.slice(0, 3);

  if (!facilities?.data.length) {
    return (
      <div className="w-full h-[350px] bg-myGreen1 grid place-items-center">
        <Image
          src={"/images/Hotel Booking-cuate.svg"}
          typeof="image/svg"
          width={300}
          height={300}
          alt="Hotel Booking-cuate"
          className="size-[20rem]"
          priority
        />
      </div>
    );
  }

  return (
    <Carousel>
      {currentFacilities.map((facility: ResponseFacility) => (
        <FacilityCarouselItem key={facility.id} {...facility} />
      ))}
    </Carousel>
  );
};

export default FacilityCarousel;
