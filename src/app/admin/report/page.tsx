import FormReporting from "@/components/Admin/Dashboard/FormReporting";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Rocket } from "@phosphor-icons/react/dist/ssr";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Report",
  description: "Report page management for Kusuma Bloom",
};

const Page = () => {
  return (
    <div className="h-[73dvh]">
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-1">
            <Rocket size={20} /> Cetak Laporan Bulanan
          </CardTitle>
          <CardDescription className="text-sm">
            Silahkan pilih laporan bulanan yang akan dicetak.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormReporting />
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
