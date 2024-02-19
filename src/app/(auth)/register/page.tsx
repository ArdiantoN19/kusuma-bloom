"use client";

import { userRegisterAction } from "@/lib/actions/authAction";
import { At, Password, User } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import React, { FunctionComponent } from "react";
import { useFormState } from "react-dom";

const Page: FunctionComponent = () => {
  const [state, formAction] = useFormState(userRegisterAction, null);

  return (
    <div className="h-screen w-full bg-[url(/images/wave.svg)] bg-top bg-no-repeat grid place-items-center md:px-6 lg:px-20">
      <div className="max-w-screen-lg mx-auto md:border rounded-xl md:shadow-xl p-6 md:p-8 flex items-center md:bg-white gap-10">
        <div className="w-1/2 hidden md:block">
          <Image
            src="/images/Journey-amico.svg"
            alt="Journey-amico"
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full md:w-1/2">
          <div className="text-xl text-primary font-semibold flex items-center gap-2 mb-5 md:mb-8">
            <Image
              src={"/images/logo-telaga-kusuma.png"}
              width={32}
              height={32}
              alt="logo-telaga-kusuma"
              className="w-7 h-7 object-cover"
            />{" "}
            Kusuma Bloom
          </div>
          <h1 className="text-3xl font-bold mb-1">
            Selamat Datang Pengguna Baru
          </h1>
          <p className="text-muted text-xs mb-5">
            Isikan semua data yang diperlukan, data Anda akan disimpan dan
            dijamin kerahasiaanya
          </p>
          {state?.message && (
            <div className="bg-red-100 border border-red-400 p-4 text-red-400 text-xs rounded mb-4">
              {state?.message}
            </div>
          )}
          <form action={formAction}>
            <div className="mb-3">
              <div className=" w-full border border-muted rounded overflow-hidden flex items-center has-[:focus]:border-primary">
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
              <span className="text-red-400 text-xs">
                {state?.Error?.username}
              </span>
            </div>
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
                {state?.Error?.email}
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
                {state?.Error?.password}
              </span>
            </div>
            <button
              type="submit"
              className="w-full py-3 mb-5 bg-gradient-primary text-white btn-shadow rounded-xl border border-black flex items-center gap-x-2 justify-center text-lg"
            >
              REGISTER 🔥
            </button>
            <div className="text-center text-sm text-muted">
              <p className="inline">Atau kamu sudah punya akun? </p>
              <Link href={"/login"} className="text-primary hover:underline">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
