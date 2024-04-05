import QRCode from "@/components/User/QRCode";
import React from "react";

interface PageProps {
  params: {
    id: string;
  };
}

const Page: React.FC<PageProps> = ({ params }) => {
  return (
    <>
      <QRCode id={params.id} />
    </>
  );
};

export default Page;
