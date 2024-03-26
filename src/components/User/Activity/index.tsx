"use client";

import { createQueryString, dateFormatter, rupiahFormatter } from "@/utils";
import { ArrowLeft, Ticket } from "@phosphor-icons/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import DialogFilterActivity from "./DialogFilterActivity";

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
  failed: "text-red-400",
  pending: "text-myOrange",
};

const ActivityUser = () => {
  const router = useRouter();
  const params = useSearchParams();

  const status: string = params.get("status") || "";

  const onClickStatusHandler = useCallback(
    (value: string) => {
      if (!!value) {
        const queryString = createQueryString("/user/activity", [
          { key: "status", value },
        ]);
        router.push(queryString);
        return;
      }
      router.push("/user/activity");
      return;
    },
    [router]
  );

  const dataActivities = useMemo(() => {
    return {
      datas: fakeActivities.filter((activity: any) => {
        return activity.status.toLowerCase().includes(status);
      }),
    };
  }, [status]);

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
            status === "failed" && "border-primary text-primary"
          }`}
          type="button"
          onClick={() => onClickStatusHandler("failed")}
        >
          Gagal
        </button>
      </div>
      <div className="flex flex-col">
        {dataActivities.datas.map((data: any) => (
          <div key={data.id} className="flex gap-x-3 px-2 py-3 border-b">
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
                <p className="text-muted">{dateFormatter(data.date)}</p>
              </div>
              <p className="text-xs font-bold">Pemesanan Tiket</p>
              <p className="text-[.7em] text-muted">
                {rupiahFormatter(data.price)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityUser;
