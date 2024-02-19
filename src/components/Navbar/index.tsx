"use client";

import React, { FunctionComponent, useEffect } from "react";
import Link from "next/link";
import { FireSimple, Heart, List, X } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

const Navbar: FunctionComponent = () => {
  const [offsetY, setOffsetY] = React.useState(0);
  const handleScroll = () => setOffsetY(window.scrollY);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header
      className={`py-5 sticky top-0 z-50 bg-myGreen1 ${
        offsetY > 0 && "shadow-md"
      }`}
    >
      <nav>
        <div className="container flex items-center justify-between">
          <Link
            href={"/"}
            className="text-xl rounded-full text-primary font-semibold flex items-center gap-2"
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
          <ul className="bg-white lg:flex items-center justify-center rounded-full px-7 py-2.5 gap-x-7 shadow-sm border border-muted hidden">
            <li className="hover:text-primary transition-all text-primary">
              <Link href={"/"}>Home</Link>
            </li>
            <li className="hover:text-primary transition-all">
              <Link href={"/about"}>Layanan</Link>
            </li>
            <li className="hover:text-primary transition-all">
              <Link href={"/about"}>Fasilitas</Link>
            </li>
            <li className="hover:text-primary transition-all">
              <Link href={"/about"}>Tentang Kami</Link>
            </li>
          </ul>
          <div className="hidden lg:flex items-center gap-x-2">
            <Link
              href={"/signin"}
              className="bg-transparent px-4 py-1.5 border border-primary rounded-full shadow-sm flex items-center gap-x-1"
            >
              Login <Heart size={16} fill="#FF0000" weight="fill" />
            </Link>
            <Link
              href={"/register"}
              className=" px-4 py-1.5 rounded-full bg-gradient-primary text-white shadow-sm border border-black btn-shadow flex items-center gap-x-1"
            >
              Register <FireSimple size={16} fill="orange" weight="fill" />
            </Link>
          </div>
          <div className="relative lg:hidden">
            <input
              type="checkbox"
              className="w-6 h-6 peer/checkbox absolute top-0 right-0 appearance-none "
            />
            <List size={28} className="block peer-checked/checkbox:hidden" />
            <X size={28} className="hidden peer-checked/checkbox:block" />

            <div className="hidden transition-all peer-checked/checkbox:block min-h-screen fixed z-50 top-[65px] w-full left-0 bg-black/40 backdrop-blur-sm">
              <div className="transition-all absolute right-0 h-screen w-5/6 bg-myGreen1 flex flex-col items-center gap-y-10 justify-center">
                <ul className=" flex items-center justify-center gap-y-7 flex-col">
                  <li className="hover:text-primary transition-all nav-item nav-active text-primary">
                    <Link href={"/"}>Home</Link>
                  </li>
                  <li className="hover:text-primary transition-all nav-item ">
                    <Link href={"/about"}>Layanan</Link>
                  </li>
                  <li className="hover:text-primary transition-all nav-item ">
                    <Link href={"/about"}>Fasilitas</Link>
                  </li>
                  <li className="hover:text-primary transition-all nav-item ">
                    <Link href={"/about"}>Tentang Kami</Link>
                  </li>
                </ul>
                <div className="flex items-center gap-x-2">
                  <Link
                    href={"/signin"}
                    className="bg-transparent px-4 py-1.5 border border-primary rounded-full shadow-sm flex items-center gap-x-1"
                  >
                    Login <Heart size={16} fill="#FF0000" weight="fill" />
                  </Link>
                  <Link
                    href={"/register"}
                    className=" px-4 py-1.5 rounded-full bg-primary text-white shadow-sm border border-black btn-shadow flex items-center gap-x-1"
                  >
                    Register{" "}
                    <FireSimple size={16} fill="orange" weight="fill" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
