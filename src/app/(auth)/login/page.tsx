import FormLogin from "@/components/Auth/FormLogin";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login",
  description: "Login page of kusuma bloom",
};

const Page = () => {
  return (
    <div className="h-screen w-full bg-[url(/images/wave.svg)] bg-top bg-no-repeat grid place-items-center md:px-6 lg:px-20">
      <div className="max-w-screen-lg mx-auto md:border rounded-xl md:shadow-xl p-6 md:p-8 flex items-center md:bg-white gap-10">
        <div className="w-1/2 hidden md:block">
          <Image
            src="/images/travel selfie-bro.svg"
            alt="travel selfie-bro"
            width={500}
            height={500}
            className="w-full h-full object-cover"
            priority
          />
        </div>
        <div className="w-full md:w-1/2">
          <Link
            href={"/"}
            className="text-xl text-primary font-semibold flex items-center gap-2 mb-5 md:mb-8"
          >
            <Image
              src={"/images/logo-telaga-kusuma.png"}
              width={32}
              height={32}
              alt="logo-telaga-kusuma"
              className="w-7 h-7 object-cover"
            />{" "}
            Kusuma Bloom
          </Link>
          <h1 className="text-3xl font-bold mb-1">Selamat Datang Kembali</h1>
          <p className="text-muted text-xs mb-5">
            Mohon berikan email dan kata sandi Anda yang sudah terdaftar di
            sistem kami.
          </p>
          <FormLogin />
        </div>
      </div>
    </div>
  );
};

export default Page;
