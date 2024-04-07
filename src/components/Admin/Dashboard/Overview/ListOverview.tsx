import { OverviewDashboardActionType } from "@/types/dashboardAction";
import React from "react";
import ItemOverview from "./ItemOverview";
import {
  ArrowsDownUp,
  CurrencyDollarSimple,
  Ticket,
  Users,
} from "@phosphor-icons/react/dist/ssr";

const ListOverview: React.FC<OverviewDashboardActionType> = ({
  totalIncome,
  totalTicket,
  totalTransaction,
  totalUser,
}) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <ItemOverview
        title="Total Pendapatan"
        icon={<CurrencyDollarSimple size={20} />}
        total={totalIncome}
        isMoney
      />
      <ItemOverview
        title="Total User"
        icon={<Users size={20} />}
        total={totalUser}
      />
      <ItemOverview
        title="Sisa Tiket"
        icon={<Ticket size={20} />}
        total={totalTicket}
      />
      <ItemOverview
        title="Total Transaksi"
        icon={<ArrowsDownUp size={20} />}
        total={totalTransaction}
      />
    </div>
  );
};

export default ListOverview;
