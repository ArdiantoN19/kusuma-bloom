import React, { FunctionComponent } from "react";
import Link from "next/link";
import { FireSimple, Heart, List, X } from "@phosphor-icons/react/dist/ssr";

const Navbar: FunctionComponent = () => {
  return (
    <nav className="py-5 sticky top-0 z-50 bg-myGreen1">
      <div className="container flex items-center justify-between">
        <Link
          href={"/"}
          className="bg-gradient-primary px-4 py-1.5 rounded-full text-white shadow-sm font-semibold"
        >
          Kusuma Bloom
        </Link>
        <ul className="bg-white lg:flex items-center justify-center rounded-full px-7 py-2.5 gap-x-7 shadow-sm border hidden">
          <li className="hover:text-primary transition-all text-primary line">
            <Link href={"/"}>Home</Link>
          </li>
          <li className="hover:text-primary transition-all">
            <Link href={"/about"}>About</Link>
          </li>
          <li className="hover:text-primary transition-all">
            <Link href={"/about"}>Service</Link>
          </li>
          <li className="hover:text-primary transition-all">
            <Link href={"/about"}>Facilities</Link>
          </li>
        </ul>
        <div className="hidden lg:flex items-center gap-x-2">
          <Link
            href={"/signin"}
            className="bg-white px-4 py-1.5 border rounded-full shadow-sm flex items-center gap-x-1"
          >
            Login <Heart size={16} fill="#FF0000" weight="fill" />
          </Link>
          <Link
            href={"/signin"}
            className=" px-4 py-1.5 rounded-full text-primary shadow-sm border border-primary flex items-center gap-x-1 hover:bg-white/50"
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

          <div className="hidden transition-all peer-checked/checkbox:block min-h-screen fixed z-50 top-[76px] w-full left-0 bg-black/40 backdrop-blur-sm">
            <div className="transition-all absolute right-0 h-screen w-5/6 bg-myGreen1 flex flex-col items-center gap-y-10 justify-center">
              <ul className=" flex items-center justify-center gap-y-7 flex-col">
                <li className="hover:text-primary transition-all nav-item nav-active text-primary line">
                  <Link href={"/"}>Home</Link>
                </li>
                <li className="hover:text-primary transition-all nav-item ">
                  <Link href={"/about"}>About</Link>
                </li>
                <li className="hover:text-primary transition-all nav-item ">
                  <Link href={"/about"}>Service</Link>
                </li>
                <li className="hover:text-primary transition-all nav-item ">
                  <Link href={"/about"}>Facilities</Link>
                </li>
              </ul>
              <div className="flex items-center gap-x-2">
                <Link
                  href={"/signin"}
                  className="bg-white px-4 py-1.5 border rounded-full shadow-sm flex items-center gap-x-1"
                >
                  Login <Heart size={16} fill="#FF0000" weight="fill" />
                </Link>
                <Link
                  href={"/signin"}
                  className=" px-4 py-1.5 rounded-full text-primary shadow-sm border border-primary flex items-center gap-x-1 hover:bg-white/50"
                >
                  Register <FireSimple size={16} fill="orange" weight="fill" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
