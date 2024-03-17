"use client";

import React from "react";
import { useFormState, useFormStatus } from "react-dom";
import Alert, { AlertType } from "@/components/Alert";
import { userRegisterAction } from "@/lib/actions/authAction";
import { At, Password, User } from "@phosphor-icons/react/dist/ssr";
import { signIn } from "next-auth/react";
import { Circle } from "@phosphor-icons/react";

const FormRegister = () => {
  const [state, formAction] = useFormState(userRegisterAction, null);
  const { pending } = useFormStatus();
  return (
    <>
      {state?.message && <Alert type={AlertType.ERROR}>{state.message}</Alert>}
      <form action={formAction}>
        <div className="mb-3">
          <div className=" w-full border border-muted rounded overflow-hidden flex items-center has-[:focus]:border-primary bg-white">
            <div className="relative w-8 h-full">
              <User
                size={24}
                weight="regular"
                className="text-muted absolute top-1/2 -translate-y-1/2 left-2"
              />
            </div>
            <input
              type="text"
              placeholder="Username"
              name="username"
              className="w-full px-3 py-4 outline-none border-0 block "
            />
          </div>
          <span className="text-red-400 text-xs">{state?.Error?.username}</span>
        </div>
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
          <span className="text-red-400 text-xs">{state?.Error?.email}</span>
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
          <span className="text-red-400 text-xs">{state?.Error?.password}</span>
        </div>
        <button
          type="submit"
          className="w-full py-3 mb-5 bg-gradient-primary text-white btn-shadow rounded-xl border border-black flex items-center gap-x-2 justify-center text-lg"
          disabled={pending}
        >
          {pending ? (
            <>
              <Circle size={20} className="animate-pulse" /> Loading...
            </>
          ) : (
            <>REGISTER 🔥</>
          )}
        </button>
        <div className="text-center text-sm text-muted">
          <p className="inline">Atau kamu sudah punya akun? </p>
          <button
            onClick={() => signIn("credentials")}
            className="text-primary hover:underline"
            type="button"
          >
            Login
          </button>
        </div>
      </form>
    </>
  );
};

export default FormRegister;
