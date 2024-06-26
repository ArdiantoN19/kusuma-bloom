import DetailActivity from "@/components/User/Activity/DetailActivity";
import { getTransactionByIdAction } from "@/lib/actions/transactionAction";
import { getAuthServerSession } from "@/lib/auth";
import { ResponseTransactionWithDiscount } from "@/types/transactionAction";
import { Metadata, ResolvingMetadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id;
  return {
    title: `activitas-${id}`,
    description: "Activity detail page for Kusuma Bloom",
  };
}

const Page: React.FC<PageProps> = async ({ params }) => {
  const session = await getAuthServerSession();
  const response = await getTransactionByIdAction(
    session?.user.userId,
    params.id
  );
  const transaction: ResponseTransactionWithDiscount = response.data!;

  if (response.status !== "success") {
    return redirect("/user/dashboard");
  }

  return (
    <>
      <DetailActivity transaction={transaction} />
    </>
  );
};

export default Page;
