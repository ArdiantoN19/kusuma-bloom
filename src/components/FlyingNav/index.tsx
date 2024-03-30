"use client";

import { House, Percent, Scroll, Ticket, User } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const FlyingNav = () => {
  const pathname = usePathname();

  return (
    !pathname.includes("/user/ticket") && (
      <div className="fixed z-50 bottom-0 md:bottom-5 left-1/2 -translate-x-1/2">
        <div className="bg-white flex items-center justify-center md:rounded-full px-7 py-2.5 gap-x-7 shadow-sm border w-full">
          <Link
            href={"/user/dashboard"}
            className="flex flex-col items-center gap-y-1"
            title="Dashboard"
          >
            <House
              size={20}
              weight={pathname.includes("/user/dashboard") ? "fill" : "regular"}
            />
            <small className="text-xs">Dashboard</small>
          </Link>
          <Link
            href={"/user/activity"}
            className="flex flex-col items-center gap-y-1"
            title="Aktivitas"
          >
            <Scroll
              size={20}
              weight={pathname.includes("/user/activity") ? "fill" : "regular"}
            />
            <small className="text-xs">Aktifitas</small>
          </Link>
          <div className="relative w-10 h-10 flex items-end justify-center">
            <Link
              href={"/user/ticket"}
              className="absolute -top-11 left-1/2 -translate-x-1/2 bg-primary size-16 text-white rounded-full p-1"
              title="Beli tiket"
            >
              <div className="w-full h-full border-2 border-dashed rounded-full flex flex-col items-center justify-center">
                <Ticket
                  size={30}
                  weight={
                    pathname.includes("/user/ticket") ? "fill" : "regular"
                  }
                />
              </div>
            </Link>
            <small className=" text-xs text-primary">Ticket</small>
          </div>

          <Link
            href={"/user/voucher"}
            className="flex flex-col items-center gap-y-1"
            title="Dashboard"
          >
            <Percent
              size={20}
              weight={pathname.includes("/user/voucher") ? "fill" : "regular"}
            />
            <small className="text-xs">Voucher</small>
          </Link>
          <Link
            href={"/user/profile"}
            className="flex flex-col items-center gap-y-1"
            title="Aktivitas"
          >
            <User
              size={20}
              weight={pathname.includes("/user/profile") ? "fill" : "regular"}
            />
            <small className="text-xs">Profile</small>
          </Link>
        </div>
      </div>
    )
  );
};

export default FlyingNav;
