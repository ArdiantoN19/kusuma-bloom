import ActivityUser from "@/components/User/Activity";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Aktifitas",
  description: "User Activity page for Kusuma Bloom",
};

const Page = () => {
  return (
    <>
      <ActivityUser />
    </>
  );
};

export default Page;
