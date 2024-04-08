import QRCode from "@/components/User/QRCode";
import { getTransactionByIdAction } from "@/lib/actions/transactionAction";
import { getAuthServerSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

interface PageProps {
  params: {
    id: string;
  };
}

const Page: React.FC<PageProps> = async ({ params }) => {
  const session = await getAuthServerSession();

  const response = await getTransactionByIdAction(
    session?.user.userId,
    params.id
  );

  if (response.status !== "success") {
    return redirect("/user/dashboard");
  }
  return (
    <>
      <QRCode id={params.id} />
    </>
  );
};

export default Page;
