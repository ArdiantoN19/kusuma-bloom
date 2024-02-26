"use client";

import React, { FunctionComponent, useEffect, useRef } from "react";
import Link from "next/link";
import { FireSimple, Heart, List, X } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { usePathname } from "next/navigation";

const Navbar: FunctionComponent = () => {
  const pathname = usePathname();
  const [offsetY, setOffsetY] = React.useState(0);
  const handleScroll = () => setOffsetY(window.scrollY);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuCheckbox = useRef<HTMLInputElement>(null);
  const onShowMenuHandler = () => {
    if (menuCheckbox.current && menuCheckbox.current.checked) {
      menuCheckbox.current.checked = false;
    }
  };
  return (
    <header
      className={`py-2 sticky top-0 z-50 bg-myGreen1 ${
        offsetY > 0 && "shadow-md"
      }`}
    >
      <nav>
        <div className="container flex items-center justify-between">
          <Link
            href={"/"}
            className="text-xl rounded-full text-primary font-semibold flex items-center gap-2 py-3"
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
            <li
              className={`hover:text-primary transition-all ${
                pathname === "/" ? "text-primary" : ""
              }`}
            >
              <Link href={"/"}>Home</Link>
            </li>
            <li
              className={`hover:text-primary transition-all ${
                pathname === "/about" ? "text-primary" : ""
              }`}
            >
              <Link href={"/about"}>Tentang Kami</Link>
            </li>
            <li
              className={`hover:text-primary transition-all ${
                pathname === "/facility" ? "text-primary" : ""
              }`}
            >
              <Link href={"/facility"}>Fasilitas</Link>
            </li>
            <li
              className={`hover:text-primary transition-all ${
                pathname === "/contact" ? "text-primary" : ""
              }`}
            >
              <Link href={"/contact"}>Kontak Kami</Link>
            </li>
          </ul>
          <div className="hidden lg:flex items-center gap-x-2">
            <button
              onClick={() => signIn("credentials")}
              className="bg-transparent px-4 py-1.5 border border-primary rounded-full shadow-sm flex items-center gap-x-1"
            >
              Login <Heart size={16} fill="#FF0000" weight="fill" />
            </button>
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
              className="w-6 h-6 peer/checkbox absolute top-0 right-0 appearance-none"
              ref={menuCheckbox}
            />

            <List size={28} className="block peer-checked/checkbox:hidden" />
            <X size={28} className="hidden peer-checked/checkbox:block" />

            <div className="hidden transition-all peer-checked/checkbox:block min-h-screen fixed z-50 top-[67px] w-full left-0 bg-black/40 backdrop-blur-sm">
              <div className="transition-all absolute right-0 h-screen w-5/6 bg-myGreen1 flex flex-col gap-y-10 p-6">
                <ul className=" flex gap-y-7 flex-col">
                  <li
                    className={`hover:text-primary transition-all ${
                      pathname === "/" ? "text-primary" : ""
                    }`}
                  >
                    <Link href={"/"} onClick={onShowMenuHandler}>
                      Home
                    </Link>
                  </li>
                  <li
                    className={`hover:text-primary transition-all ${
                      pathname === "/about" ? "text-primary" : ""
                    }`}
                  >
                    <Link href={"/about"} onClick={onShowMenuHandler}>
                      Tentang Kami
                    </Link>
                  </li>
                  <li
                    className={`hover:text-primary transition-all ${
                      pathname === "/facility" ? "text-primary" : ""
                    }`}
                  >
                    <Link href={"/facility"} onClick={onShowMenuHandler}>
                      Fasilitas
                    </Link>
                  </li>
                  <li
                    className={`hover:text-primary transition-all ${
                      pathname === "/contact" ? "text-primary" : ""
                    }`}
                  >
                    <Link href={"/contact"} onClick={onShowMenuHandler}>
                      Kontak Kami
                    </Link>
                  </li>
                </ul>
                <div className="flex items-center gap-x-2">
                  <button
                    onClick={() => signIn("credentials")}
                    className="bg-transparent px-4 py-1.5 border border-primary rounded-full shadow-sm flex items-center gap-x-1"
                  >
                    Login <Heart size={16} fill="#FF0000" weight="fill" />
                  </button>
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
