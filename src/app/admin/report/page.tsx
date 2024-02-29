import FormReporting from "@/components/Dashboard/FormReporting";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

const Page = () => {
  return (
    <div className="pt-6 h-[73dvh]">
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Cetak Laporan Bulanan</CardTitle>
          <CardDescription>
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
