import React from "react";
import Carousel from "../Carousel";
import FacilityCarouselItem from "./FacilityCarouselItem";

const FacilityCarousel = () => {
  return (
    <Carousel>
      <FacilityCarouselItem />
      <FacilityCarouselItem />
      <FacilityCarouselItem />
    </Carousel>
  );
};

export default FacilityCarousel;
