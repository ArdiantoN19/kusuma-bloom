import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ResponseTransaction } from "@/types/transactionAction";
import TransactionList from "./TransactionList";

interface CardTransactionProps {
  transactions: ResponseTransaction[];
  countTransactions: number;
}

const CardTransaction: React.FC<CardTransactionProps> = ({
  transactions,
  countTransactions,
}) => {
  return (
    <Card className="md:col-span-3">
      <CardHeader>
        <CardTitle>Transaksi Terakhir</CardTitle>
        <CardDescription>
          Total ada {countTransactions} transaksi dibulan ini.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TransactionList transactions={transactions} />
      </CardContent>
    </Card>
  );
};

export default CardTransaction;
