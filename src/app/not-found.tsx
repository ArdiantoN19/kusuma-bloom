import Image from "next/image";
import React from "react";

const NotFoundPage = () => {
  return (
    <div className="container min-h-[90dvh] flex flex-col justify-center items-center">
      <Image
        src={"/images/404 Error.svg"}
        typeof="image/svg"
        width={300}
        height={300}
        alt="404 Error"
        className="size-[30rem]"
      />
      <p className="text-lg">
        Opps, sepertinya halaman yang Anda cari tidak ditemukan
      </p>
    </div>
  );
};

export default NotFoundPage;
