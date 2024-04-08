import CardProfile from "@/components/Profile/CardProfile";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Profile",
  description: "Profile page management for Kusuma Bloom",
};

const Page = () => {
  return (
    <div className="space-y-4 ">
      <div className="mb-5">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
          Profile
        </h2>
        <p className="text-sm text-muted-foreground">
          Kelola data profile disini.
        </p>
      </div>
      <CardProfile />
    </div>
  );
};

export default Page;
