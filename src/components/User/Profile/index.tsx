"use client";

import React from "react";
import CardProfile from "@/components/Profile/CardProfile";
import { ArrowLeft, SignOut } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import DialogLogout from "@/components/Logout";
import { useSession } from "next-auth/react";
import StatusMember from "./StatusMember";

const ProfileUser = () => {
  const router = useRouter();
  const { data: session } = useSession();

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
        <h2 className="font-bold text-sm">Profile</h2>
        <DialogLogout>
          <button type="button" title="Sign Out">
            <SignOut size={20} weight="bold" />
          </button>
        </DialogLogout>
      </div>
      <div className="relative">
        <CardProfile />
        <StatusMember status={session?.user.statusMember} />
      </div>
    </div>
  );
};

export default ProfileUser;
