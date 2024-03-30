"use client";

import { ArrowLeft } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import React from "react";
import CardOrderTicket from "./CardOrderTicket";

const TicketUser = () => {
  const router = useRouter();

  return (
    <div className="container pt-5 lg:pb-10 bg-white border-b rounded shadow-sm border-r border-l">
      <div className="flex justify-between items-center mb-5">
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
