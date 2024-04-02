import ActivityUser from "@/components/User/Activity";
import { transactionService } from "@/lib/actions/transactionAction/TransactionService";
import { ORDERBY } from "@/types/transactionAction";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Aktifitas",
  description: "User Activity page for Kusuma Bloom",
};

interface ActivityUserPage {
  searchParams: {
    orderBy: string;
  };
}

const Page: React.FC<ActivityUserPage> = async ({ searchParams }) => {
  const transformOrderBy: Record<string, any> = {
    newest: ORDERBY.desc,
    oldest: ORDERBY.asc,
  };
  const transactions = await transactionService.getTransactions(
    transformOrderBy[searchParams.orderBy]
  );

  return (
    <>
      <ActivityUser transactions={transactions} />
    </>
  );
};

export default Page;
