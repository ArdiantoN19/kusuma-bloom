import React, { FunctionComponent } from "react";
import { Users } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { ResponseFacility } from "@/types/facilityAction";
import { createTemplateSlug, dateFormatter } from "@/utils";

interface FacilityCarouselItemProps extends ResponseFacility {}

const FacilityCarouselItem: FunctionComponent<FacilityCarouselItemProps> = (
  props
) => {
  return (
    <div className="relative bg-white">
      <Image
        src={props.image}
        alt={props.name}
        width={300}
        height={300}
        className="h-[350px] w-full animate-fade-in object-cover"
      />
      <div className="w-full h-full absolute z-[1]  hover:bg-gradient-to-t from-black/70 transition-all group/facility hover:backdrop-blur-sm top-0 flex items-end">
        <div className="p-4 hidden group-hover/facility:block">
          <Link
            href={`/facility/${createTemplateSlug(props.name)}`}
            className="text-white font-semibold text-2xl mb-2 block capitalize"
          >
            {props.name}
          </Link>
          <div className="flex items-center gap-x-2 mb-5">
            <div
              className="rounded bg-white flex items-center gap-x-1 px-1.5 py-1"
              title="dibuat pada"
            >
              <small className="text-xs">
                {dateFormatter(props.created_at.toString())}
              </small>
            </div>
            <div
              className="rounded bg-primary text-white flex items-center gap-x-1 px-1.5 py-1"
              title="kapasitas"
            >
              <Users size={16} />
              <small className="text-xs">{props.capacities}</small>
            </div>
          </div>
          <div className="flex items-center gap-x-2">
            <Image
              src={props.user?.image!}
              alt={props.user?.name!}
              width={32}
              height={32}
              className="rounded-full w-8 h-8"
            />
            <div>
              <p className="text-sm text-white">{props.user?.name}</p>
              <p className="text-xs text-muted">(Admin)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilityCarouselItem;
