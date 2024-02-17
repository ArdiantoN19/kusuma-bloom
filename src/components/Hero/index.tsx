import React, { FunctionComponent } from "react";
import { rupiahFormatter } from "@/utils";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

const HeroSection: FunctionComponent = () => {
  return (
    <section className="container min-h-screen mt-5 md:mt-10 lg:mt-14">
      <div className="w-full flex items-center flex-col-reverse lg:flex-row md:gap-y-3 lg:gap-y-0">
        <div className="w-full lg:w-1/2 xl:w-3/5">
          <div className="mb-5 lg:mb-10">
            <h1 className="text-2xl md:text-4xl lg:text-4xl xl:text-5xl font-bold leading-tight">
              Pemesanan{" "}
              <span className="font-thin text-primary">Ticket Online</span>{" "}
              untuk Telaga Kusuma, Telusuri informasi kita sekarang
            </h1>
          </div>
          <div className="text-justify mb-8 lg:mb-14 w-full xl:w-5/6">
            <p className="text-sm md:text-base">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. At
              voluptas, fugiat repellendus molestiae consectetur aperiam quis
              odit beatae recusandae magnam quidem fugit asperiores quo magni,
              sapiente libero consequatur id soluta!
            </p>
          </div>
          <button className="bg-gradient-primary flex items-center px-12 py-2.5 text-white shadow rounded-md border-2 border-black gap-x-3">
            Ayo Pesan Sekarang{" "}
            <ArrowRight
              size={16}
              weight="bold"
              className="animate-slide-right-looping"
            />
          </button>
        </div>
        <div className="w-full lg:w-1/2 xl:w-2/5 relative">
          <Image
            src={"/images/woman-take-picture.png"}
            typeof="image/png"
            alt="two people take a picture"
            className="w-full h-80 md:h-[23rem] lg:h-auto object-cover"
            width={300}
            height={300}
            priority
          />
          <div className="p-3 min-w-40 bg-white border rounded-lg absolute top-0 lg:top-5 left-0 flex items-center gap-x-3">
            <div>
              <p className="text-xs text-muted">Harga hari ini:</p>
              <h3 className="text-black">{rupiahFormatter(15000)}</h3>
            </div>
            <button className="bg-gradient-primary px-2.5 py-1 rounded-full text-white text-xs">
              Pesan
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
