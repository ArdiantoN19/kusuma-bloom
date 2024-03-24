import ProfileUser from "@/components/User/Profile";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Profile",
  description: "User Profile page for Kusuma Bloom",
};

const Page = () => {
  return (
    <>
      <ProfileUser />
    </>
  );
};

export default Page;
