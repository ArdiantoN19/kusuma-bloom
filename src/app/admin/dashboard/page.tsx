import { getAuthServerSession } from "@/lib/auth";
import React from "react";

const Page = async () => {
  const session = await getAuthServerSession();
  return <div>Hello, {session?.user.name}</div>;
};

export default Page;
