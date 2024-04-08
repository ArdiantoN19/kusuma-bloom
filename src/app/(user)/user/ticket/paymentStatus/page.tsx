import CardPaymentStatus from "@/components/User/Ticket/CardPaymentStatus";
import { getTransactionByIdAction } from "@/lib/actions/transactionAction";
import { getAuthServerSession } from "@/lib/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "Status Pembayaran",
  description: "Payment status page management for Kusuma Bloom",
};

interface PageProps {
  searchParams: {
    order_id: string;
    status: string;
    transaction_status: string;
  };
}

const Page: React.FC<PageProps> = async ({ searchParams }) => {
  const session = await getAuthServerSession();

  if (!searchParams.order_id) {
    return redirect("/user/ticket");
  }

  const transaction = await getTransactionByIdAction(
    session?.user.userId,
    searchParams.order_id
  );

  return <CardPaymentStatus transaction={transaction.data!} />;
};

export default Page;
