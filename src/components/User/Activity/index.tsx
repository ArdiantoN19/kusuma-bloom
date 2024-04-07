"use client";

import { createQueryString, dateFormatter, rupiahFormatter } from "@/utils";
import { ArrowLeft, Scroll, Ticket } from "@phosphor-icons/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import DialogFilterActivity from "./DialogFilterActivity";
import {
  ResponseTransaction,
  TRANSACTION_STATUS,
} from "@/types/transactionAction";
import Link from "next/link";

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
      {!dataActivities.datas.length ? (
        <div className="flex items-center justify-center h-52 flex-col gap-y-2">
          <Scroll size={42} className="text-primary" />
          <h1 className="text-sm text-center">Tidak ada aktivitas</h1>
        </div>
      ) : (
        <div className="flex flex-col lg:pb-24 h-full overflow-auto scrollable-content">
          {dataActivities.datas.map((data: ResponseTransaction) => (
            <Link
              key={data.id}
              href={
                data.status !== TRANSACTION_STATUS.PENDING
                  ? `/user/activity/${data.id}`
                  : `/user/ticket/pay?token=${data.snap_token}`
              }
              className="flex gap-x-3 px-2 py-3 border-b hover:bg-slate-50 rounded"
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
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivityUser;
