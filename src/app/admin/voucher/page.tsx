import FormAddVoucher from "@/components/Voucher/FormAddVoucher";
import VoucherTable from "@/components/Voucher/Table";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Voucher",
  description: "Voucher page management for Kusuma Bloom",
};

const Page = () => {
  return (
    <div className="space-y-4 ">
      <div className="flex items-center justify-between space-y-2  mb-5">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Voucher
          </h2>
          <p className="text-sm text-muted-foreground">
            Kelola data voucher disini.
          </p>
        </div>
        <FormAddVoucher />
      </div>
      <VoucherTable />
    </div>
  );
};

export default Page;
