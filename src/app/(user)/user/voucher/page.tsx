import VoucherUser from "@/components/User/Voucher";
import { getVouchersAction } from "@/lib/actions/voucherAction";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Voucher",
  description: "User Voucher page for Kusuma Bloom",
};

const Page = async () => {
  const vouchers = await getVouchersAction();

  return (
    <>
      <VoucherUser vouchers={vouchers.data} />
    </>
  );
};

export default Page;
