import FormAddFacility from "@/components/Facility/FormAddFacility";
import FacilityTable from "@/components/Facility/Table";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Fasilitas",
  description: "Facility page management for Kusuma Bloom",
};

const Page = () => {
  return (
    <div className="space-y-4 ">
      <div className="flex items-center justify-between space-y-2  mb-5">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Fasilitas</h2>
          <p className="text-sm text-muted-foreground">
            Kelola data fasilitas disini.
          </p>
        </div>
        <FormAddFacility />
      </div>
      <FacilityTable />
    </div>
  );
};

export default Page;
