import AboutSection from "@/components/About";
import ServiceSection from "@/components/Service";
import TeamSection from "@/components/Team";
import React, { FunctionComponent } from "react";

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
