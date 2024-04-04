import CardPaymentStatus from "@/components/User/Ticket/CardPaymentStatus";
import { getTransactionByIdAction } from "@/lib/actions/transactionAction";
import { redirect } from "next/navigation";
import React from "react";

interface PageProps {
  searchParams: {
    order_id: string;
    status: string;
    transaction_status: string;
  };
}

const Page: React.FC<PageProps> = async ({ searchParams }) => {
  if (!searchParams.order_id) {
    return redirect("/user/ticket");
  }

  const transaction = await getTransactionByIdAction(searchParams.order_id);

  return <CardPaymentStatus transaction={transaction.data!} />;
};

export default Page;
