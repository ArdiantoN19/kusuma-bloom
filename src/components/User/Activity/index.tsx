"use client";

import { createQueryString, dateFormatter, rupiahFormatter } from "@/utils";
import { ArrowLeft, Ticket } from "@phosphor-icons/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import DialogFilterActivity from "./DialogFilterActivity";
import { ResponseTransaction } from "@/types/transactionAction";

const fakeActivities: any = [
  {
    id: 1,
    date: new Date(),
    status: "pending",
    price: 500000,
  },
  {
    id: 2,
    date: new Date(),
    status: "success",
    price: 1200000,
  },
  {
    id: 3,
    date: new Date(),
    status: "failed",
    price: 1500000,
  },
];

const statusColor = {
  success: "text-green-400",
  failure: "text-red-400",
  pending: "text-myOrange",
};

interface ActivityUserProps {
  transactions: ResponseTransaction[];
}

const ActivityUser: React.FC<ActivityUserProps> = ({ transactions }) => {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();

  const status: string = params.get("status") || "";

  const onClickStatusHandler = useCallback(
    (value: string) => {
      if (!!value) {
        const queryString = createQueryString(pathname, [
          { key: "orderBy", value: "newest" },
          { key: "status", value },
        ]);
        router.push(queryString);
        router.refresh();
        return;
      }
      router.refresh();
      router.push(pathname + "?orderBy=newest");
      return;
    },
    [router, pathname]
  );

  const dataActivities = useMemo(() => {
    return {
      datas: transactions.filter((transaction: ResponseTransaction) => {
        return transaction.status.toLowerCase().includes(status);
      }),
    };
  }, [status, transactions]);

  return (
    <div className="container pt-5 relative h-[90dvh] overflow-hidden">
      <div className="sticky top-0 left-0 w-full">
        <div className="flex justify-between items-center mb-5">
          <button
            type="button"
            title="dashboard"
            onClick={() => router.push("/user/dashboard")}
          >
            <ArrowLeft size={20} weight="bold" />
          </button>
          <h2 className="font-bold text-sm">Aktivitas</h2>
          <DialogFilterActivity />
        </div>
        <div className="grid grid-cols-4 gap-x-2 mb-3">
          <button
            className={`border rounded-full py-1.5 text-center font-bold text-sm ${
              !status && "border-primary text-primary"
            }`}
            type="button"
            onClick={() => onClickStatusHandler("")}
          >
            All
          </button>
          <button
            className={`border rounded-full py-1.5 text-center font-bold text-xs ${
              status === "pending" && "border-primary text-primary"
            }`}
            type="button"
            onClick={() => onClickStatusHandler("pending")}
          >
            Pending
          </button>
          <button
            className={`border rounded-full py-1.5 text-center font-bold text-xs ${
              status === "success" && "border-primary text-primary"
            }`}
            type="button"
            onClick={() => onClickStatusHandler("success")}
          >
            Sukses
          </button>
          <button
            className={`border rounded-full py-1.5 text-center font-bold text-xs ${
              status === "failure" && "border-primary text-primary"
            }`}
            type="button"
            onClick={() => onClickStatusHandler("failure")}
          >
            Gagal
          </button>
        </div>
      </div>
      <div className="flex flex-col lg:pb-24 h-full overflow-auto scrollable-content">
        {dataActivities.datas.map((data: any) => (
          <div
            key={data.id}
            className="flex gap-x-3 px-2 py-3 border-b cursor-pointer hover:bg-slate-50 rounded"
          >
            <Ticket
              size={10}
              className="size-8 rounded-full bg-green-100/90 p-2 text-primary"
            />
            <div className="flex-1">
              <div className="flex justify-between items-center text-[.65em]">
                <p
                  className={`block ${
                    statusColor[
                      data.status.toLowerCase() as keyof typeof statusColor
                    ]
                  }`}
                >
                  {data.status}
                </p>
                <p className="text-muted">{dateFormatter(data.created_at)}</p>
              </div>
              <p className="text-xs font-bold">Pemesanan Tiket</p>
              <p className="text-[.7em] text-muted">
                {rupiahFormatter(data.gross_amount)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityUser;
