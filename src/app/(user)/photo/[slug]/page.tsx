import Image from "next/image";
import React from "react";

interface Props {
  params: {
    slug: string;
  };
}

const Page: React.FC<Props> = async ({ params }) => {
  return (
    <>
      <div className="container pt-12 mb-32">
        <h1 className="text-3xl font-bold mb-5">Panduan Transaksi Tiket</h1>
        <div className="max-w-4xl mx-auto">
          <Image
            src={`/images/${params.slug}`}
            className="aspect-video w-full rounded-lg border bg-white"
            width={300}
            height={300}
            priority
            quality={100}
            sizes="100vw"
            alt={`${params.slug}`}
          />
        </div>
      </div>
    </>
  );
};

export default Page;
