"use server";

import {
  ORDERBY,
  ResponseTransaction,
  TRANSACTION_STATUS,
} from "@/types/transactionAction";
import { transactionService } from "../transactionAction/TransactionService";
import { userService } from "../userAction/UserService";
import { ticketService } from "../ticketAction/TicketService";
import { OverviewDashboardActionType } from "@/types/dashboardAction";
import { transformMonthFromIndex } from "@/utils";

export const TransactionForAdminDashboardAction = async ({
  limit,
  orderBy,
}: {
  limit: number;
  orderBy: ORDERBY;
}) => {
  const transactions = await transactionService.getTransactions({
    limit,
    orderBy,
  });
  const countTransactions =
    await transactionService.getAllCountTransactionsInOneMonth();
  return { transactions, countTransactions };
};

const reformatTransaction = (transactions: ResponseTransaction[]) => {
  return transactions.reduce((result, transaction) => {
    const month = new Date(transaction.created_at).getMonth();
    const monthName = transformMonthFromIndex[month];

    const existingEntryIndex = result.findIndex(
      (item: { name: string; total: number }) => item.name === monthName
    );

    if (existingEntryIndex !== -1) {
      result[existingEntryIndex].total += transaction.gross_amount;
    } else {
      result.push({ name: monthName, total: transaction.gross_amount });
    }

    return result;
  }, [] as { name: string; total: number }[]);
};

export const OverviewDashboardAction =
  async (): Promise<OverviewDashboardActionType> => {
    const transactions = await transactionService.getTransactions({});
    const totalIncome = transactions
      .map((transaction) => {
        if (transaction.status === TRANSACTION_STATUS.SUCCESS) {
          return transaction.gross_amount;
        }
        return 0;
      })
      .reduce((acc, currValue) => acc + currValue, 0);

    const totalUser = await userService.getCountUsers();

    const ticketActive = await ticketService.getActiveTicket();
    const totalTicket = ticketActive?.quantity;

    const totalTransaction = await transactionService.getAllCountTransactions();

    const transactionWithStatusSuccess = transactions.filter(
      (transaction) => transaction.status === TRANSACTION_STATUS.SUCCESS
    );

    const totalIncomeByMonth = reformatTransaction(
      transactionWithStatusSuccess
    );

    return {
      totalIncome,
      totalUser,
      totalTicket: totalTicket!,
      totalTransaction,
      totalIncomeByMonth,
    };
  };
