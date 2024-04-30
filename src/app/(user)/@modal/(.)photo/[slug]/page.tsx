import Modal from "@/components/Modal";
import Image from "next/image";
import React from "react";

interface Props {
  params: {
    slug: string;
  };
}

const Page: React.FC<Props> = ({ params }) => {
  return (
    <Modal>
      <div className="bg-white p-4 rounded-lg border w-full">
        <h1 className="text-lg md:text-2xl xl:text-3xl font-bold mb-5 text-center">
          Panduan Transaksi Tiket
        </h1>
        <div className="w-[320px] md:min-w-[600px] max-w-3xl mx-auto">
          <Image
            src={`/images/${params.slug}`}
            className="aspect-video w-full bg-white"
            width={300}
            height={300}
            priority
            quality={100}
            sizes="100vw"
            alt={`${params.slug}`}
          />
        </div>
      </div>
    </Modal>
  );
};

export default Page;
