import VoucherUser from "@/components/User/Voucher";
import { transactionService } from "@/lib/actions/transactionAction/TransactionService";
import { getVouchersAction } from "@/lib/actions/voucherAction";
import { voucherService } from "@/lib/actions/voucherAction/VoucherService";
import { getAuthServerSession } from "@/lib/auth";
import { ResponseVoucher } from "@/types/voucherAction";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Voucher",
  description: "User Voucher page for Kusuma Bloom",
};

const Page = async () => {
  const session = await getAuthServerSession();
  const vouchers = await getVouchersAction();
  const voucherIds = await transactionService.getVoucherIdInTransactionByUserId(
    session?.user.userId
  );
  const voucherCanClaim = vouchers.data.filter(
    (voucher: ResponseVoucher) => !voucherIds.includes(voucher.id)
  );

  return (
    <>
      <VoucherUser vouchers={voucherCanClaim} />
    </>
  );
};

export default Page;
