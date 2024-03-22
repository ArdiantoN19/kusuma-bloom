"use client";

import { House, Percent, Scroll, Ticket, User } from "@phosphor-icons/react";
import Link from "next/link";
import React from "react";

const FlyingNav = () => {
  return (
    <div className="fixed z-50 bottom-0 md:bottom-10 left-1/2 -translate-x-1/2">
      <div className="bg-white flex items-center justify-center md:rounded-full px-7 py-2.5 gap-x-7 shadow-sm border w-full">
        <Link
          href={"/user/dashboard"}
          className="flex flex-col items-center gap-y-1 text-black"
          title="Dashboard"
        >
          <House size={20} weight="fill" />
          <small className="text-xs">Dashboard</small>
        </Link>
        <Link
          href={"/user/dashboard"}
          className="flex flex-col items-center gap-y-1"
          title="Aktivitas"
        >
          <Scroll size={20} />
          <small className="text-xs">Aktifitas</small>
        </Link>
        <div className="relative w-10 h-10 flex items-end justify-center">
          <Link
            href={"/user/dashboard"}
            className="flex flex-col items-center gap-y-1 absolute -top-11 left-1/2 -translate-x-1/2 bg-primary  justify-center size-16 text-white rounded-full"
            title="Beli tiket"
          >
            <Ticket size={30} />
          </Link>
          <small className=" text-xs text-primary">Ticket</small>
        </div>

        <Link
          href={"/user/dashboard"}
          className="flex flex-col items-center gap-y-1"
          title="Dashboard"
        >
          <Percent size={20} />
          <small className="text-xs">Voucher</small>
        </Link>
        <Link
          href={"/user/dashboard"}
          className="flex flex-col items-center gap-y-1"
          title="Aktivitas"
        >
          <User size={20} />
          <small className="text-xs">Akun</small>
        </Link>
      </div>
    </div>
  );
};

export default FlyingNav;
