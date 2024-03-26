import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { ResponseFacility } from "@/types/facilityAction";
import Link from "next/link";
import { createTemplateSlug } from "@/utils";
import ReactMarkdown from "react-markdown";

interface FacilityItemProps extends ResponseFacility {}

const FacilityItem: React.FC<FacilityItemProps> = (props) => {
  return (
    <div className="rounded p-3 bg-white border shadow-sm">
      <Image
        src={props.image}
        alt={props.name}
        width={300}
        height={300}
        className="w-full aspect-video rounded-sm mb-3 object-cover"
      />
      <h3 className="text-lg font-bold mb-2 truncate capitalize">
        {props.name}
      </h3>
      <ReactMarkdown className="text-muted text-xs line-clamp-2 mb-5 h-[32px]">
        {props.description}
      </ReactMarkdown>
      <div className="flex justify-end">
        <Link
          href={`/facility/${createTemplateSlug(props.name)}`}
          className="btn-shadow border border-black bg-gradient-primary text-white px-5 py-1.5 rounded-full flex items-center gap-x-1"
        >
          Detail
          <ArrowUpRight size={16} weight="bold" />
        </Link>
      </div>
    </div>
  );
};

export default FacilityItem;
