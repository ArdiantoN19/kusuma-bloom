import ScanQRCode from "@/components/Admin/ScanQRCode";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Scan QR Code",
  description: "Scan QR Code page management for Kusuma Bloom",
};

const Page = () => {
  return <ScanQRCode />;
};

export default Page;
