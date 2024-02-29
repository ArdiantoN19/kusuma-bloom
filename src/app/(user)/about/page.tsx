import AboutSection from "@/components/About";
import ServiceSection from "@/components/Service";
import TeamSection from "@/components/Team";
import { Metadata } from "next";
import React, { FunctionComponent } from "react";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description: "About page of kusuma bloom",
};

const Page: FunctionComponent = () => {
  return (
    <>
      <AboutSection />
      <ServiceSection />
      <TeamSection />
    </>
  );
};

export default Page;
