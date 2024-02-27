"use client";

import React, { FunctionComponent, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  SignOut,
  User,
  FireSimple,
  Heart,
  List,
  X,
} from "@phosphor-icons/react";

const Navbar: FunctionComponent = () => {
  const { data: session } = useSession();
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
            {session?.user ? (
              <>
                <Button
                  asChild
                  className="bg-gradient-primary rounded-full btn-shadow border border-black"
                >
                  <Link
                    href={
                      session.user.role === "ADMIN"
                        ? "/admin/dashboard"
                        : "/user/dashboard"
                    }
                  >
                    Dashboard
                  </Link>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar>
                      <AvatarImage src={session?.user.image as string} />
                      <AvatarFallback>
                        {session.user.name?.slice(2)}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>
                      Hello, {session.user.name}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link
                        href={"/user/profile"}
                        className="flex items-center gap-1"
                      >
                        <User size={16} /> Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <button
                        onClick={() => signOut()}
                        className="flex items-center gap-1"
                      >
                        <SignOut size={16} />
                        Logout
                      </button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button
                  onClick={() => signIn("credentials")}
                  className="bg-transparent text-base border border-primary rounded-full shadow-sm text-primary"
                >
                  Login{" "}
                  <Heart
                    size={16}
                    fill="#FF0000"
                    weight="fill"
                    className="ml-1"
                  />
                </Button>
                <Button
                  asChild
                  className="rounded-full text-base bg-gradient-primary text-white border border-black btn-shadow"
                >
                  <Link href={"/register"}>
                    Register{" "}
                    <FireSimple
                      size={16}
                      fill="orange"
                      weight="fill"
                      className="ml-1"
                    />
                  </Link>
                </Button>
              </>
            )}
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
                  {session?.user ? (
                    <>
                      <Button
                        asChild
                        className="bg-gradient-primary rounded-full btn-shadow border border-black"
                      >
                        <Link href={"/user/dashboard"}>Dashboard</Link>
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Avatar>
                            <AvatarImage src={session?.user.image as string} />
                            <AvatarFallback>
                              {session.user.name?.slice(2)}
                            </AvatarFallback>
                          </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel>
                            Hello, {session.user.name}
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Link
                              href={"/user/profile"}
                              className="flex items-center gap-1"
                            >
                              <User size={16} /> Profile
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <button
                              onClick={() => signOut()}
                              className="flex items-center gap-1"
                            >
                              <SignOut size={16} />
                              Logout
                            </button>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </>
                  ) : (
                    <>
                      <Button
                        onClick={() => signIn("credentials")}
                        className="bg-transparent text-base border border-primary rounded-full shadow-sm text-primary"
                      >
                        Login{" "}
                        <Heart
                          size={16}
                          fill="#FF0000"
                          weight="fill"
                          className="ml-1"
                        />
                      </Button>
                      <Button
                        asChild
                        className="rounded-full text-base bg-gradient-primary text-white border border-black btn-shadow"
                      >
                        <Link href={"/register"}>
                          Register{" "}
                          <FireSimple
                            size={16}
                            fill="orange"
                            weight="fill"
                            className="ml-1"
                          />
                        </Link>
                      </Button>
                    </>
                  )}
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
