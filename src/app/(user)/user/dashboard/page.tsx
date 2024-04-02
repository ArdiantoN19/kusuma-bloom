import HeroInfo from "@/components/User/Dashboard/HeroInfo";
import { transactionService } from "@/lib/actions/transactionAction/TransactionService";
import { TRANSACTION_STATUS } from "@/types/transactionAction";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "User Dashboard page for Kusuma Bloom",
};

const Page = async () => {
  const transaction = await transactionService.getLatestTransaction();
  const successCountTransaction =
    await transactionService.getCountTransactionByStatus(
      TRANSACTION_STATUS.SUCCESS
    );
  const failureCountTransaction =
    await transactionService.getCountTransactionByStatus(
      TRANSACTION_STATUS.FAILURE
    );
  return (
    <div>
      <HeroInfo
        latestDateTransaction={transaction.created_at}
        successCountTransaction={successCountTransaction}
        failureCountTransaction={failureCountTransaction}
      />
    </div>
  );
};

export default Page;
