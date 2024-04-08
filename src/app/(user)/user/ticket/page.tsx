import TicketUser from "@/components/User/Ticket";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Tiket",
  description: "Ticket page management for Kusuma Bloom",
};

const Page = () => {
  return (
    <>
      <TicketUser />
    </>
  );
};

export default Page;
