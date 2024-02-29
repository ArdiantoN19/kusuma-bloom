import { getAuthServerSession } from "@/lib/auth";
import React from "react";
import {
  ArrowsDownUp,
  CurrencyDollarSimple,
  DownloadSimple,
  Ticket,
  Users,
} from "@phosphor-icons/react/dist/ssr";
import CardItemOverview from "@/components/Dashboard/CardItemOverview";
import CardTransaction from "@/components/Dashboard/CardTransaction";
import CardChartTransaction from "@/components/Dashboard/CardChartTransaction";
import Link from "next/link";

const Page = async () => {
  const session = await getAuthServerSession();
  return (
    <div className="space-y-4">
      <div className="space-y-4 pt-6 mb-5">
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
            <DownloadSimple size={20} />
            Cetak Laporan
          </Link>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <CardItemOverview
          title="Total Pendapatan"
          icon={<CurrencyDollarSimple size={20} />}
          total={16000000}
          omzetPercent={20.1}
        />
        <CardItemOverview
          title="Total User"
          icon={<Users size={20} />}
          total={16000000}
          omzetPercent={20.1}
        />
        <CardItemOverview
          title="Total Tiket"
          icon={<Ticket size={20} />}
          total={16000000}
          omzetPercent={20.1}
        />
        <CardItemOverview
          title="Total Transaksi"
          icon={<ArrowsDownUp size={20} />}
          total={16000000}
          omzetPercent={20.1}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 ">
        <CardChartTransaction />
        <CardTransaction />
      </div>
    </div>
  );
};

export default Page;
