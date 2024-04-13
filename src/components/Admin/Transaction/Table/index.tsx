import React from "react";
import TransactionTableWrapper from "./TransactionTableWrapper";
import { columns } from "./Columns";
import { getTransactionsAction } from "@/lib/actions/transactionAction";

const TransactionTable = async () => {
  const response = await getTransactionsAction();
  return <TransactionTableWrapper columns={columns} data={response.data!} />;
};

export default TransactionTable;
