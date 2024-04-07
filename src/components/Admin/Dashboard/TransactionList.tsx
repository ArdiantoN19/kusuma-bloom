import React from "react";
import TransactionItem from "./TransactionItem";
import { ResponseTransaction } from "@/types/transactionAction";
import { Scroll } from "@phosphor-icons/react/dist/ssr";

interface TransactionListProps {
  transactions: ResponseTransaction[];
}
const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  if (!transactions.length) {
    return (
      <div className="w-full h-[200px] grid place-items-center">
        <div className="space-y-3">
          <Scroll size={44} className="text-primary mx-auto" />
          <h3>Tidak ada transaksi</h3>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-8">
      {transactions.map((transaction: ResponseTransaction) => (
        <TransactionItem key={transaction.id} {...transaction} />
      ))}
    </div>
  );
};

export default TransactionList;
