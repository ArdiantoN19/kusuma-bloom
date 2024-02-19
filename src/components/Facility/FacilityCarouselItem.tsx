import React, { FunctionComponent } from "react";
import { Users } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

const FacilityCarouselItem: FunctionComponent = () => {
  return (
    <div className="relative bg-white">
      <Image
        src={"/images/facility.jpg"}
        alt="facility"
        width={300}
        height={300}
        className="h-full w-full animate-fade-in"
      />
      <div className="w-full h-full absolute z-[1]  hover:bg-gradient-to-t from-black/70 transition-all group/facility hover:backdrop-blur-sm top-0 flex items-end">
        <div className="p-4 hidden group-hover/facility:block">
          <Link
            href={"/"}
            className="text-white font-semibold text-2xl mb-2 block"
          >
            Kolam Renang
          </Link>
          <div className="flex items-center gap-x-2 mb-5">
            <div
              className="rounded bg-white flex items-center gap-x-1 px-1.5 py-1"
              title="dibuat pada"
            >
              <small className="text-xs">22 Feb 2023</small>
            </div>
            <div
              className="rounded bg-primary text-white flex items-center gap-x-1 px-1.5 py-1"
              title="kapasitas"
            >
              <Users size={16} />
              <small className="text-xs">3-10 orang</small>
            </div>
          </div>
          <div className="flex items-center gap-x-2">
            <Image
              src={"/images/avatar/default.jpg"}
              alt="default-avatar"
              width={32}
              height={32}
              className="rounded-full w-8 h-8"
            />
            <div>
              <p className="text-sm text-white">Ardianto</p>
              <p className="text-xs text-muted">(Admin)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilityCarouselItem;
