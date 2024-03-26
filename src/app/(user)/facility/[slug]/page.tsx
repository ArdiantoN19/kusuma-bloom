import FacilityDetail from "@/components/Facility/FacilityDetail";
import FacilityItem from "@/components/Facility/FacilityItem";
import {
  getFacilitiesAction,
  getFacilityDetailAction,
} from "@/lib/actions/facilityAction";
import { ResponseFacility } from "@/types/facilityAction";
import { encodeTemplateSlug } from "@/utils";
import { SmileyXEyes } from "@phosphor-icons/react/dist/ssr";
import { Metadata, ResolvingMetadata } from "next";
import React from "react";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug;
  return {
    title: slug,
    description: "Facility detail page for Kusuma Bloom",
  };
}

const Page: React.FC<Props> = async ({ params }) => {
  const facility = await getFacilityDetailAction(
    encodeTemplateSlug(params.slug)
  );

  const facilities = await getFacilitiesAction();
  const facilitiesData = facilities.data.slice(0, 4);

  if (!facility.data) {
    return (
      <div className="min-h-[90dvh] w-full flex items-center justify-center flex-col gap-2">
        <SmileyXEyes size={102} className="text-primary" />
        <h2 className="text-center text-lg">Fasilitas tidak ditemukan</h2>
      </div>
    );
  }

  return (
    <div className="container lg:max-w-2xl mx-auto mb-28 mt-5 lg:mt-10">
      <FacilityDetail facility={facility.data} />
      <div className="grid md:grid-cols-2 gap-4">
        {facilitiesData.map((facility: ResponseFacility) => (
          <FacilityItem key={facility.id} {...facility} />
        ))}
      </div>
    </div>
  );
};

export default Page;
