"use client";

import React, { useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { getTimeOfDay } from "@/utils";
import { CheckCircle, Headset, Star, XCircle } from "@phosphor-icons/react";
import CardPopMember from "@/components/DashboardUser/CardPopMember";

const HeroInfoSkeleton = () => {
  return (
    <div className="h-[10.5rem] bg-gradient-primary pt-5">
      <div className="h-full container relative">
        <div className="flex items-center justify-between">
          <div className="text-xs flex flex-col text-white">
            <small>{getTimeOfDay()},</small>
            <div className="w-20 h-5 rounded-sm bg-muted animate-pulse"></div>
          </div>
          <Link
            href={"https://wa.me/082123202938"}
            target="_blank"
            rel="noopener noreferrer"
            title="Bantuan"
            className="text-white flex flex-col items-center gap-y-1"
          >
            <Headset size={16} />
            <small className="text-xs">Bantuan</small>
          </Link>
        </div>
        <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 border bg-white rounded-md w-[85%] shadow-sm md:max-w-md">
          <div className="grid grid-cols-4 gap-x-3 divide-x p-3 border-b">
            <div className="text-xs col-span-2">
              <p>Transaksi Terakhir</p>
              <div className="font-bold">
                <div className="w-24 h-5 bg-muted animate-pulse rounded-sm mb-1"></div>
                <div className="w-10 h-5 bg-muted animate-pulse rounded-sm"></div>
              </div>
            </div>
            <div className="pl-3">
              <p className="text-xs mb-1">Berhasil</p>
              <div className="w-10 h-5 bg-muted animate-pulse rounded-sm"></div>
            </div>
            <div className="pl-3">
              <p className="text-xs mb-1">Gagal</p>
              <div className="w-10 h-5 bg-muted animate-pulse rounded-sm"></div>
            </div>
          </div>
          <div className="flex items-center justify-between p-3">
            <div className="w-20 h-5 animate-pulse bg-muted rounded-sm"></div>
            <div className="w-20 h-5 animate-pulse bg-muted rounded-sm"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HeroInfo = () => {
  const { data: session, update: sessionUpdate } = useSession();
  const [isPopMember, setIsPopMember] = useState<boolean>(
    Boolean(session?.user.isPopMember)
  );

  const onClickUpdatePopMemberHandler = useCallback(() => {
    setIsPopMember((prev) => !prev);
    sessionUpdate({
      info: {
        isPopMember: !isPopMember,
      },
    });
  }, [sessionUpdate, isPopMember]);

  if (!session) {
    return <HeroInfoSkeleton />;
  }

  return (
    <>
      <div className="h-[10.5rem] bg-gradient-primary pt-5">
        <div className="h-full container relative">
          <div className="flex items-center justify-between">
            <div className="text-xs flex flex-col text-white">
              <small>{getTimeOfDay()},</small>
              <h3 className="font-bold uppercase">{session?.user.name}</h3>
            </div>
            <Link
              href={"https://wa.me/082123202938"}
              target="_blank"
              rel="noopener noreferrer"
              title="Bantuan"
              className="text-white flex flex-col items-center gap-y-1"
            >
              <Headset size={16} />
              <small className="text-xs">Bantuan</small>
            </Link>
          </div>
          <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 border bg-white rounded-md w-[85%] shadow-sm md:max-w-md">
            <div className="grid grid-cols-4 gap-x-3 divide-x p-3 border-b">
              <div className="text-xs col-span-2">
                <p>Transaksi Terakhir</p>
                <div className="font-bold">
                  <p>Rabu, 12 Agustus 2024</p>
                  <p className="text-primary">03.00</p>
                </div>
              </div>
              <div className="pl-3">
                <p className="text-xs mb-1">Berhasil</p>
                <h3 className="text-sm font-bold flex gap-x-1 items-center">
                  <CheckCircle size={20} className="text-primary" /> 3
                </h3>
              </div>
              <div className="pl-3">
                <p className="text-xs mb-1">Gagal</p>
                <h3 className="text-sm font-bold flex gap-x-1 items-center">
                  <XCircle size={20} className="text-red-400" /> 3
                </h3>
              </div>
            </div>
            <div className="flex items-center justify-between p-3">
              <small className="text-xs">{session?.user.email}</small>
              <button
                className="flex items-center gap-x-1 border bg-green-100/90 px-2.5 py-1.5 rounded-full relative"
                onClick={onClickUpdatePopMemberHandler}
              >
                <Star size={16} className="text-primary" />
                <small className="text-primary font-bold leading-none">
                  {session?.user.role}
                </small>
                <div className="rounded-full px-1.5 py-[.1em] bg-myOrange text-white absolute -top-2 -right-1 text-[.5em]">
                  PRO
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <CardPopMember
        isPopMember={isPopMember}
        onClickUpdatePopMemberHandler={onClickUpdatePopMemberHandler}
      />
    </>
  );
};

export default HeroInfo;
