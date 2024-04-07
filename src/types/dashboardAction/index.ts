export type OverviewDashboardActionType = {
  totalIncome: number;
  totalUser: number;
  totalTicket: number;
  totalTransaction: number;
  totalIncomeByMonth: { name: string; total: number }[];
};
