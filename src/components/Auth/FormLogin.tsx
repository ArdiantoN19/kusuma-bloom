"use client";

import React, { FormEvent, useCallback, useState } from "react";
import { Circle, At, Password } from "@phosphor-icons/react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthValidator } from "@/lib/actions/authAction/validator";
import { signIn } from "next-auth/react";
import Alert, { AlertType } from "@/components/Alert";
import Link from "next/link";
import { hashedTokenOTP } from "@/lib/actions/authAction";

interface CustomFormEvent extends FormEvent<HTMLFormElement> {
  currentTarget: HTMLFormElement & {
    email: {
      [index: string]: string;
    };
    password: Record<string, any>;
  };
}

const FormLogin = () => {
  const [error, setError] = useState<Record<string, any>>({
    message: "",
    Error: {},
  });
  const [isLoading, setisLoading] = useState<boolean>(false);
  const params = useSearchParams();
  const router = useRouter();
  const [dataVerifyEmail, setDataVerifyEmail] = useState<Record<string, any>>(
    {}
  );

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
          const error = res?.error?.split("!");
          setDataVerifyEmail({
            email,
            token: error?.[1],
            isToken: Boolean(Number(error?.[1])),
          });
          setError({ message: error?.[0], Error: {} });
          return;
        }
        if (params.get("callbackUrl")?.includes("register")) {
          router.push("/user/dashboard");
          return;
        }
        router.push(params.get("callbackUrl") as string);
      } catch (error: any) {
        console.log(error);
      } finally {
        setisLoading(false);
      }
    },
    [params, router]
  );

  const onClickVerifyEmail = useCallback(async () => {
    const url = new URL("/verify/email/send", process.env.NEXT_PUBLIC_BASE_URL);
    url.searchParams.set("email", dataVerifyEmail.email as string);
    url.searchParams.set("verification_send", "1");
    url.searchParams.set(
      "token",
      `${await hashedTokenOTP(dataVerifyEmail.token as string)}${
        dataVerifyEmail.token
      }`
    );
    router.push(url.toString());
  }, [dataVerifyEmail.email, dataVerifyEmail.token, router]);

  return (
    <>
      {error.message && (
        <Alert type={AlertType.ERROR}>
          <div>
            {error.message}
            {dataVerifyEmail.isToken && (
              <button
                className="underline"
                type="button"
                onClick={onClickVerifyEmail}
              >
                Verifikasi sekarang
              </button>
            )}
          </div>
        </Alert>
      )}
      <form onSubmit={onSubmitHandler}>
        <div className="mb-3">
          <div className="w-full border border-muted rounded overflow-hidden flex items-center has-[:focus]:border-primary bg-white">
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
          <span className="text-red-400 text-xs">{error?.Error?.email}</span>
        </div>
        <div className="mb-8">
          <div className="w-full border border-muted rounded overflow-hidden flex items-center has-[:focus]:border-primary bg-white">
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
          <span className="text-red-400 text-xs">{error?.Error?.password}</span>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 mb-5 bg-gradient-primary text-white btn-shadow rounded-xl border border-black flex items-center gap-x-2 justify-center text-lg disabled:brightness-75"
        >
          LOGIN{" "}
          {isLoading ? <Circle size={20} className="animate-pulse" /> : "❤️"}
        </button>
        <div className="text-center text-sm text-muted">
          <p className="inline">Belum punya akun? </p>
          <Link href={"/register"} className="text-primary hover:underline">
            Register
          </Link>
        </div>
      </form>
    </>
  );
};

export default FormLogin;
