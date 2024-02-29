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

const UserNav = () => {
  const { data: session } = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} className="relative h-8 w-8 rounded-full">
          <Avatar>
            <AvatarImage src={session?.user.image as string} />
            <AvatarFallback>{session?.user.name?.slice(0, 2)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end" forceMount>
        <DropdownMenuLabel className="flex flex-col gap-1">
          <h4 className="text-sm leading-none">{session?.user.name}</h4>
          <p className="text-muted font-thin text-xs">{session?.user.email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link
            href={
              session?.user.role === "ADMIN"
                ? "/admin/profile"
                : "/user/profile"
            }
            className="flex items-center gap-1"
          >
            <User size={16} /> Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button onClick={() => signOut()} className="flex items-center gap-1">
            <SignOut size={16} />
            Logout
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNav;
