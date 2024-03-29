import { getAuthServerSession } from "@/lib/auth";
import React from "react";
import {
  ArrowsDownUp,
  CurrencyDollarSimple,
  DownloadSimple,
  Ticket,
  Users,
} from "@phosphor-icons/react/dist/ssr";
import CardItemOverview from "@/components/Admin/Dashboard/CardItemOverview";
import CardTransaction from "@/components/Admin/Dashboard/CardTransaction";
import CardChartTransaction from "@/components/Admin/Dashboard/CardChartTransaction";
import Link from "next/link";
import { getTotalTicketRecordsAction } from "@/lib/actions/ticketAction";
import { getTotalUserRecordsAction } from "@/lib/actions/userAction";

const Page = async () => {
  const session = await getAuthServerSession();
  const totalTickets = await getTotalTicketRecordsAction();
  const totalUsers = await getTotalUserRecordsAction();
  return (
    <div className="space-y-4">
      <div className="mb-5">
        <div className="flex items-center justify-between md:space-y-2">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              Dashboard
            </h2>
            <p className="text-sm text-muted-foreground">
              Lihat dan pantau statistik bisnis Anda
            </p>
          </div>
          <Link
            href={"/admin/report"}
            className="flex items-center gap-1 py-2 rounded-md text-white font-medium text-sm px-4 bg-gradient-primary border border-black btn-shadow"
            title="Cetak laporan"
          >
            <DownloadSimple size={20} />
            <span className="hidden md:block">Cetak Laporan</span>
          </Link>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <CardItemOverview
          title="Total Pendapatan"
          icon={<CurrencyDollarSimple size={20} />}
          total={16000000}
          isMoney
          omzetPercent={20.1}
        />
        <CardItemOverview
          title="Total User"
          icon={<Users size={20} />}
          total={totalUsers.data.total}
          omzetPercent={20.1}
        />
        <CardItemOverview
          title="Total Tiket"
          icon={<Ticket size={20} />}
          total={totalTickets.data.total}
          omzetPercent={20.1}
        />
        <CardItemOverview
          title="Total Transaksi"
          icon={<ArrowsDownUp size={20} />}
          total={16000000}
          isMoney
          omzetPercent={20.1}
        />
      </div>
      <div className="grid gap-y-4 lg:gap-x-4 md:grid-cols-2 lg:grid-cols-7 ">
        <CardChartTransaction />
        <CardTransaction />
      </div>
    </div>
  );
};

export default Page;
