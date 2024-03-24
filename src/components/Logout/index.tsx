"use client";

import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

interface DialogLogoutProps {
  children: Readonly<React.ReactNode>;
}

const DialogLogout: React.FC<DialogLogoutProps> = ({ children }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
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

export default DialogLogout;
