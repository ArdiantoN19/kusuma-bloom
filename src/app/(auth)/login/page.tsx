"use client";

import Alert, { AlertType } from "@/components/Alert";
import { AuthValidator } from "@/lib/actions/authAction/validator";
import { Circle } from "@phosphor-icons/react";
import { At, Password } from "@phosphor-icons/react/dist/ssr";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { FormEvent, useCallback, useState } from "react";

interface CustomFormEvent extends FormEvent<HTMLFormElement> {
  currentTarget: HTMLFormElement & {
    email: {
      [index: string]: string;
    };
    password: Record<string, any>;
  };
}

const Page = () => {
  const [error, setError] = useState<Record<string, any>>({
    message: "",
    Error: {},
  });
  const [isLoading, setisLoading] = useState<boolean>(false);
  const params = useSearchParams();

  const onSubmitHandler = useCallback(
    async (e: CustomFormEvent) => {
      e.preventDefault();
      const email = e.currentTarget.email.value;
      const password = e.currentTarget.password.value;

      setisLoading(true);
      const validation = AuthValidator.LoginValidator({ email, password });
      if (!validation.success) {
        setError({
          Error: validation.error.flatten().fieldErrors,
          message: "",
        });
        setisLoading(false);
        return;
      }

      try {
        const res = await signIn("credentials", {
          email,
          password,
          callbackUrl: params.get("callbackUrl") as string,
          redirect: false,
        });
        if (!res?.ok) {
          setError({ message: res?.error, Error: {} });
        }
      } catch (error: any) {
        console.log(error);
      } finally {
        setisLoading(false);
      }
    },
    [params]
  );

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
          {error.message && (
            <Alert type={AlertType.ERROR}>{error.message}</Alert>
          )}
          <form onSubmit={onSubmitHandler}>
            <div className="mb-3">
              <div className="w-full border border-muted rounded overflow-hidden flex items-center has-[:focus]:border-primary">
                <div className="relative w-8 h-full">
                  <At
                    size={24}
                    weight="regular"
                    className="text-muted absolute top-1/2 -translate-y-1/2 left-2"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  className="w-full px-3 py-4 outline-none border-0 block "
                />
              </div>
              <span className="text-red-400 text-xs">
                {error?.Error?.email}
              </span>
            </div>
            <div className="mb-8">
              <div className="w-full border border-muted rounded overflow-hidden flex items-center has-[:focus]:border-primary">
                <div className="relative w-8 h-full">
                  <Password
                    size={24}
                    weight="regular"
                    className="text-muted absolute top-1/2 -translate-y-1/2 left-2"
                  />
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  className="w-full px-3 py-4 outline-none border-0 block "
                />
              </div>
              <span className="text-red-400 text-xs">
                {error?.Error?.password}
              </span>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 mb-5 bg-gradient-primary text-white btn-shadow rounded-xl border border-black flex items-center gap-x-2 justify-center text-lg disabled:brightness-75"
            >
              LOGIN{" "}
              {isLoading ? (
                <Circle size={20} className="animate-pulse" />
              ) : (
                "❤️"
              )}
            </button>
            <div className="text-center text-sm text-muted">
              <p className="inline">Belum punya akun? </p>
              <Link href={"/register"} className="text-primary hover:underline">
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
