import { seaweedScript } from "@/utils/font";
import { ArrowRight, CheckSquare } from "@phosphor-icons/react/dist/ssr";
import React, { FunctionComponent } from "react";
import FacilityCarousel from "./FacilityCarousel";
import { facilities } from "@/utils/data";
import { FacilityType } from "@/types/utils-data";
import Link from "next/link";

const FacilitySection: FunctionComponent = () => {
  return (
    <section className="">
      <div className="bg-gradient-primary w-full lg:w-3/4 py-16 lg:px-5 xl:px-0 relative lg:rounded-r">
        <div className="max-w-4xl mx-auto px-6 lg:px-5">
          <p className="tracking-wider text-lg md:text-xl text-white mb-2">
            LIHAT FASILITAS KAMI
          </p>
          <div className="font-bold text-myOrange mb-3 lg:w-3/4">
            <span className="text-2xl lg:text-3xl ">
              Telusuri semua fasilitas di{" "}
            </span>
            <span
              className={`${seaweedScript.className} text-white text-4xl md:text-5xl`}
            >
              Telaga Kusuma
            </span>
          </div>
          <p className="text-white text-sm md:w-3/4 text-justify mb-5">
            Nikmati Kenyamanan dan Keamanan yang Luar Biasa di Telaga Kusuma:
            Fasilitas Lengkap yang Mudah diakses untuk Pengalaman Liburan yang
            Tidak Terlupakan!
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:w-3/4 text-sm mb-8">
            {facilities.map((facility: FacilityType) => (
              <div
                key={facility.id}
                className="flex items-center text-white gap-x-2"
              >
                <CheckSquare size={28} weight="fill" className="text-white" />
                {facility.name}
              </div>
            ))}
            <div className="flex items-center text-white gap-x-2">
              <CheckSquare size={28} weight="fill" className="text-white" />
              Lainnya...
            </div>
          </div>
          <div className="flex">
            <Link
              href={"/facility"}
              className="flex items-center gap-x-2 p-1 bg-white border border-black shadow rounded-full pr-3 py-1 btn-shadow"
            >
              <ArrowRight
                size={28}
                weight="bold"
                className="p-2 w-8 h-8 bg-gradient-primary text-white rounded-full"
              />
              Lihat lebih
            </Link>
          </div>
        </div>
        <div className="lg:w-[26rem] xl:w-[30rem] hidden lg:block h-auto object-cover absolute top-1/2 -translate-y-1/2 -right-60 rounded shadow overflow-hidden">
          <FacilityCarousel />
        </div>
      </div>
    </section>
  );
};

export default FacilitySection;
