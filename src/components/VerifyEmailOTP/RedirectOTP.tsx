"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

const RedirectOTP: React.FC = () => {
  const params = useSearchParams();
  const router = useRouter();
  const [seconds, setSeconds] = useState<number>(5);
  const searchParams = useMemo(() => {
    return {
      status: Boolean(params.get("status")),
    };
  }, [params]);

  useEffect(() => {
    const url = new URL("/login", process.env.NEXT_PUBLIC_BASE_URL);
    url.searchParams.set("callbackUrl", encodeURI("/user/dashboard"));

    const interval = setInterval(() => {
      router.push(url.toString());
    }, 5000);

    const secondInterval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(secondInterval);
    };
  }, [searchParams.status, router]);

  return (
    <div className="min-h-screen w-full container flex justify-center items-center">
      <div>
        <h2 className="text-xl font-bold text-primary">
          Selamat, verifikasi email Anda berhasil{" "}
        </h2>
        <h5>
          Redirect ke halaman login dalam{" "}
          <span className="font-bold">{seconds}</span> detik
        </h5>
      </div>
    </div>
  );
};

export default RedirectOTP;
