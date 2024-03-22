import HeroInfo from "@/components/DashboardUser/HeroInfo";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "User Dashboard page for Kusuma Bloom",
};

const Page = () => {
  return (
    <div>
      <HeroInfo />
    </div>
  );
};

export default Page;
