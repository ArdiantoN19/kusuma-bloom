import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
  return (
    <div className="container min-h-[90dvh] flex flex-col justify-center items-center gap-2">
      <Image
        src={"/images/404 Error.svg"}
        typeof="image/svg"
        width={300}
        height={300}
        alt="404 Error"
        className="size-[30rem]"
      />
      <p className="text-lg text-center">
        Opps, sepertinya halaman yang Anda cari tidak ditemukan
      </p>
      <Button asChild variant={"primary"}>
        <Link href={"/"}>Home</Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;
