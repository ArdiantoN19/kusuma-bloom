import FormReporting from "@/components/Dashboard/FormReporting";
import Modal from "@/components/Modal";
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
    <Modal>
      <Card className="max-w-md ">
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
    </Modal>
  );
};

export default Page;
