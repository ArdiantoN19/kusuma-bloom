import { SponsorType } from "@/types/utils-data";
import { sponsors } from "@/utils/data";
import Image from "next/image";
import React, { FunctionComponent } from "react";

const VendorSection: FunctionComponent = () => {
  // const vendorContainer = useRef<HTMLDivElement>(null);

  // const handleScrollRight = () => {
  //   if (vendorContainer.current) {
  //     vendorContainer.current.scrollBy({
  //       left: 200,
  //       behavior: "smooth",
  //     });
  //   }
  // };

  return (
    <section className="pb-24">
      <div className="container">
        <div className="mb-16">
          <p className="tracking-wider text-lg text-center md:text-xl text-myOrange mb-2">
            VENDOR KAMI
          </p>
          <h3 className="text-center font-bold text-2xl md:text-3xl text-primary mb-2 ">
            Kusuma Bloom <span className="text-myOrange">Vendor</span>
          </h3>
          <p className="text-sm text-center text-muted mb-4">
            Beberapa vendor yang mendukung Kusuma Bloom
          </p>
          <div className="w-32 mx-auto">
            <div className="line bg-myOrange"></div>
          </div>
        </div>
        <div className=" flex justify-center gap-x-10 md:gap-x-20 lg:gap-x-32 w-full">
          {sponsors.map((sponsor: SponsorType) => (
            <Image
              src={sponsor.image}
              key={sponsor.id}
              alt={sponsor.name}
              width={100}
              height={100}
              title={sponsor.name}
              className="w-16 h-16 md:w-auto md:h-20 object-contain rounded-md"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VendorSection;
