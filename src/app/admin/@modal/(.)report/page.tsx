import FormReporting from "@/components/Dashboard/FormReporting";
import Modal from "@/components/Modal";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Rocket } from "@phosphor-icons/react/dist/ssr";
import React from "react";

const Page = () => {
  return (
    <Modal>
      <Card className="w-72 md:w-auto md:max-w-md">
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
    </Modal>
  );
};

export default Page;
