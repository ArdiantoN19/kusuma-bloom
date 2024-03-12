"use client";

import React, { FormEvent, useCallback, useState } from "react";
import { Circle, At, Password } from "@phosphor-icons/react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthValidator } from "@/lib/actions/authAction/validator";
import { signIn } from "next-auth/react";
import Alert, { AlertType } from "@/components/Alert";
import Link from "next/link";

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
  return (
    <>
      {error.message && <Alert type={AlertType.ERROR}>{error.message}</Alert>}
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
          <span className="text-red-400 text-xs">{error?.Error?.email}</span>
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
