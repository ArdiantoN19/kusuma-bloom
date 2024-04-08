import PayOrderTicket from "@/components/User/Ticket/PayOrderTicket";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Pembayaran",
  description: "Payment page management for Kusuma Bloom",
};

const Page = () => {
  return (
    <div className="container w-full h-[90dvh] grid place-items-center">
      <PayOrderTicket />
    </div>
  );
};

export default Page;
