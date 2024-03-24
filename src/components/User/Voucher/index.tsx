"use client";

import { ResponseVoucher } from "@/types/voucherAction";
import { ArrowLeft, Percent } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import React from "react";

interface VoucherUserProps {
  vouchers: ResponseVoucher[];
}

const VoucherUser: React.FC<VoucherUserProps> = ({ vouchers }) => {
  const router = useRouter();
  return (
    <div className="container pt-5">
      <div className="flex justify-between items-center mb-5">
        <button
          type="button"
          title="dashboard"
          onClick={() => router.push("/user/dashboard")}
        >
          <ArrowLeft size={20} weight="bold" />
        </button>
        <h2 className="font-bold text-sm">Voucher</h2>
        <div className="size-5"></div>
      </div>
      <div className="grid md:grid-cols-2 gap-2">
        {vouchers.map((voucher: ResponseVoucher) => (
          <div
            key={voucher.id}
            className="flex gap-x-3 px-2 py-3 border-2 border-dashed rounded"
          >
            <Percent
              size={10}
              className="size-8 rounded-full bg-green-100/90 p-2 text-primary"
            />
            <div className="flex-1">
              <p className="text-xs font-bold leading-tight">{voucher.name}</p>
              <p className="text-[.7em] text-muted">{voucher.total} voucher</p>
            </div>
            <p className="text-sm text-primary">{voucher.discount * 100}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VoucherUser;
