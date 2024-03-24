"use client";

import React from "react";
import FormJoinMember from "@/components/Membership/FormJoinMember";
import { Star } from "@phosphor-icons/react";

interface StatusMemberProps {
  status: string;
}

const StatusMember: React.FC<StatusMemberProps> = ({ status }) => {
  if (!status) {
    return (
      <div className="absolute top-3 right-3 w-20 h-7 rounded bg-muted animate-pulse"></div>
    );
  }
  if (status === "pending") {
    return (
      <span className="absolute top-3 right-3 text-[.65em] text-myOrange">
        Sedang proses verifikasi member
      </span>
    );
  }
  if (status === "success") {
    return (
      <div className="absolute top-3 right-3">
        <div className="flex items-center gap-x-1 border bg-green-100/90 px-2.5 py-1.5 rounded-full relative">
          <Star size={16} className="text-primary" />
          <small className="text-primary font-bold leading-none">REGULAR</small>
          <p className="rounded-full px-1.5 py-[.1em] bg-myOrange text-white absolute -top-2 -right-1 text-[.5em]">
            PRO
          </p>
        </div>
      </div>
    );
  }
  return <FormJoinMember />;
};

export default StatusMember;
