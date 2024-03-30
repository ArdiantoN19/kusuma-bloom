"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { SignOut, User } from "@phosphor-icons/react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "../ui/dialog";

const UserNav = () => {
  const { data: session } = useSession();

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className="relative h-8 w-8 rounded-full">
            <Avatar>
              <AvatarImage src={session?.user.image as string} />
              <AvatarFallback>{session?.user.name?.slice(0, 2)}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-40" align="end" forceMount>
          <DropdownMenuLabel className="flex flex-col gap-1">
            <h4 className="text-sm leading-none">{session?.user.name}</h4>
            <p className="text-muted font-thin text-xs">
              {session?.user.email}
            </p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link
              href={
                session?.user.role === "ADMIN"
                  ? "/admin/profile"
                  : "/user/profile"
              }
              className="flex items-center gap-1 w-full"
            >
              <User size={16} /> Profile
            </Link>
          </DropdownMenuItem>
          <DialogTrigger asChild>
            <DropdownMenuItem>
              <button className="flex items-center gap-1 w-full">
                <SignOut size={16} />
                Logout
              </button>
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent className="bg-white max-w-[350px] md:min-w-[350px] md:max-w-md rounded">
        <div className="flex flex-col gap-5 items-center justify-center">
          <h1 className="text-xl">Yakin keluar dari aplikasi ini?</h1>
          <div className="flex gap-2 justify-center">
            <DialogClose asChild>
              <Button
                variant={"primary"}
                className="bg-muted-foreground hover:bg-muted-foreground"
              >
                Close
              </Button>
            </DialogClose>
            <Button type="submit" variant={"primary"} onClick={() => signOut()}>
              Logout
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserNav;
