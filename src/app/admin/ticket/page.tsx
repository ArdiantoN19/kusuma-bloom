import { Plus } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="space-y-4">
      <div className="pt-6 mb-5">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <p className="text-sm text-muted-foreground">
              Lihat dan pantau statistik bisnis Anda
            </p>
          </div>
          <Link
            href={"/admin/report"}
            className="flex items-center gap-1 py-2 rounded-md text-white font-medium text-sm px-4 bg-gradient-primary border border-black btn-shadow"
          >
            <Plus size={20} />
            Tambah Tiket
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
