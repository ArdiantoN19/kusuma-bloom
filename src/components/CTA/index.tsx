"use client";

import { WhatsappLogo } from "@phosphor-icons/react";
import Link from "next/link";
import React from "react";

const CTA = () => {
  return (
    <div className="fixed z-10 bottom-5 right-7">
      <Link
        href={"https://wa.me/082123202938"}
        className="flex items-center gap-x-2"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="px-2.5 py-2 rounded-full border bg-white">
          <p className="text-xs font-bold">Butuh bantuan?</p>
        </div>
        <div className="bg-primary rounded-full p-1.5">
          <WhatsappLogo size={45} className="text-white" weight="light" />
        </div>
      </Link>
    </div>
  );
};

export default CTA;
