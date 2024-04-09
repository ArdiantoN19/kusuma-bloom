import React from "react";
import { DownloadSimple } from "@phosphor-icons/react/dist/ssr";
import CardTransaction from "@/components/Admin/Dashboard/CardTransaction";
import CardChartTransaction from "@/components/Admin/Dashboard/CardChartTransaction";
import Link from "next/link";
import { ORDERBY } from "@/types/transactionAction";
import {
  OverviewDashboardAction,
  TransactionForAdminDashboardAction,
} from "@/lib/actions/dashboardAction";
import ListOverview from "@/components/Admin/Dashboard/Overview/ListOverview";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard page management for Kusuma Bloom",
};

const Page = async () => {
  const dataTransactions = await TransactionForAdminDashboardAction({
    limit: 5,
    orderBy: ORDERBY.desc,
  });

  const dataOverviewDashboard = await OverviewDashboardAction();

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
      <ListOverview {...dataOverviewDashboard} />
      <div className="grid gap-y-4 lg:gap-x-4 md:grid-cols-2 lg:grid-cols-7 ">
        <CardChartTransaction data={dataOverviewDashboard.totalIncomeByMonth} />
        <CardTransaction {...dataTransactions} />
      </div>
    </div>
  );
};

export default Page;
