"use client";

import { ArrowLeft } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import React from "react";
import CardOrderTicket from "./CardOrderTicket";

const TicketUser = () => {
  const router = useRouter();

  return (
    <div className="container lg:pb-24 bg-white border-b rounded shadow-sm border-r border-l relative">
      <div className="flex justify-between items-center mb-3 pb-2 sticky pt-5 top-0 left-0 bg-white">
        <button
          type="button"
          title="dashboard"
          onClick={() => router.push("/user/dashboard")}
        >
          <ArrowLeft size={20} weight="bold" />
        </button>
        <h2 className="font-bold text-sm">Tiket</h2>
        <div
          className="
        size-3"
        ></div>
      </div>
      <CardOrderTicket />
    </div>
  );
};

export default TicketUser;
