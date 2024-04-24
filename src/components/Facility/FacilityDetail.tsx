"use client";

import React, { useCallback } from "react";
import Image from "next/image";
import ReactMardown from "react-markdown";
import { ShareNetwork } from "@phosphor-icons/react";
import { ResponseFacility } from "@/types/facilityAction";
import { copyContent, createQueryString, dateFormatter } from "@/utils";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

interface FacilityDetailProps {
  facility: ResponseFacility;
}

const FacilityDetail: React.FC<FacilityDetailProps> = ({ facility }) => {
  const pathname = usePathname();

  const onCopyToClipboardHandler = useCallback(async () => {
    const queryString = createQueryString(pathname);
    const copy = await copyContent(queryString);
    if (copy) toast.success("Link berhasil disalin");
    else toast.error("Link gagal disalin");
  }, [pathname]);

  return (
    <div className="mb-28">
      <h1 className="mb-8 text-3xl lg:text-4xl font-bold">{facility.name}</h1>
      <div className="flex items-center justify-between border-b pb-3 mb-8">
        <div className="flex items-center gap-x-2">
          <Image
            src={facility.user?.image!}
            width={300}
            height={300}
            alt={facility.user?.name!}
            className="rounded-full size-12"
          />
          <div>
            <h4 className="font-base font-semibold">{facility.user?.name}</h4>
            <p className="text-sm text-muted-foreground">
              {dateFormatter(facility.updated_at.toString())}
            </p>
          </div>
        </div>
        <button
          type="button"
          title="copy link"
          onClick={onCopyToClipboardHandler}
        >
          <ShareNetwork size={20} />
        </button>
      </div>
      <Image
        src={facility.image}
        width={300}
        height={300}
        alt={facility.name}
        className="w-full aspect-video object-cover rounded border shadow-sm mb-10"
        quality={100}
        priority
        sizes="100vw"
      />
      <ReactMardown className="mb-10">{facility.description}</ReactMardown>
    </div>
  );
};

export default FacilityDetail;
