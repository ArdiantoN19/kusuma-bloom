import Alert, { AlertType } from "@/components/Alert";
import { getAuthServerSession } from "@/lib/auth";
import React from "react";

const Page = async () => {
  const session = await getAuthServerSession();
  return (
    <div className="w-full h-[70dvh] pt-6">
      <Alert type={AlertType.SUCCESS}>
        Selamat Datang, {session?.user.name}
      </Alert>
    </div>
  );
};

export default Page;
