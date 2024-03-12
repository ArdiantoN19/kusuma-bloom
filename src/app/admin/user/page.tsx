import FormAddUser from "@/components/User/FormAddUser";
import UserTable from "@/components/User/Table";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "User",
  description: "User page management for Kusuma Bloom",
};

const Page = () => {
  return (
    <div className="space-y-4 ">
      <div className="flex items-center justify-between space-y-2  mb-5">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">User</h2>
          <p className="text-sm text-muted-foreground">
            Kelola data user disini.
          </p>
        </div>
        <FormAddUser />
      </div>
      <UserTable />
    </div>
  );
};

export default Page;
