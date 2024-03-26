"use client";

import React from "react";
import { ResponseUser } from "@/types/userAction";
import FormEditUser from "../FormEditUser";
import {
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowSquareOut, Circle } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

interface ContentActionProps {
  statusDialog: string;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  user: ResponseUser;
  onDeleteUserHandler: (id: string) => void;
  onVerifyMemberUserHandler: (id: string) => void;
  onDeleteMemberUserHandler: (userId: string) => void;
  isLoading: boolean;
}

const ContentAction: React.FC<ContentActionProps> = ({
  statusDialog,
  setOpenDialog,
  user,
  isLoading,
  onDeleteUserHandler,
  onVerifyMemberUserHandler,
  onDeleteMemberUserHandler,
}) => {
  if (statusDialog === "edit") {
    return <FormEditUser user={user} setOpenDialog={setOpenDialog} />;
  }

  if (statusDialog === "delete") {
    return (
      <div className="flex flex-col gap-5 items-center justify-center">
        <h1 className="text-xl">Yakin ingin menghapus user ini?</h1>
        <div className="flex gap-2 justify-center">
          <DialogClose asChild>
            <Button
              variant={"primary"}
              className="bg-muted-foreground hover:bg-muted-foreground"
            >
              Close
            </Button>
          </DialogClose>
          <Button
            type="submit"
            variant={"primary"}
            disabled={isLoading}
            onClick={() => onDeleteUserHandler(user.id)}
          >
            {isLoading ? (
              <>
                <Circle size={20} className="animate-pulse" /> Loading...
              </>
            ) : (
              <>Hapus</>
            )}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Verifikasi Member User</DialogTitle>
        <DialogDescription>Harap tinjau gambar dibawah ini!</DialogDescription>
      </DialogHeader>
      <div className="relative w-full h-40 rounded border mt-2 overflow-hidden">
        <Image
          src={user.memberUsers?.image as string}
          alt={user.name}
          width={200}
          height={200}
          className="w-full h-full object-cover"
        />
        <Link
          href={user.memberUsers?.image || ""}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-2 right-2 bg-white p-1 rounded-sm"
        >
          <ArrowSquareOut size={20} />
        </Link>
      </div>
      {user.memberUsers?.verifiedAt && (
        <p className="text-red-400 text-sm">
          Perhatian jika Anda menekan tombol hapus maka data tidak dapat
          dipulihan
        </p>
      )}
      <div>
        {user.memberUsers?.verifiedAt ? (
          <Button
            type="button"
            variant={"primary"}
            disabled={isLoading}
            onClick={() =>
              onDeleteMemberUserHandler(user.memberUsers?.userId as string)
            }
            className="ml-auto bg-red-400"
          >
            {isLoading ? (
              <>
                <Circle size={20} className="animate-pulse" /> Loading...
              </>
            ) : (
              <>Hapus</>
            )}
          </Button>
        ) : (
          <Button
            type="button"
            variant={"primary"}
            disabled={isLoading}
            onClick={() =>
              onVerifyMemberUserHandler(user.memberUsers?.userId as string)
            }
            className="ml-auto"
          >
            {isLoading ? (
              <>
                <Circle size={20} className="animate-pulse" /> Loading...
              </>
            ) : (
              <>Verifikasi</>
            )}
          </Button>
        )}
      </div>
    </>
  );
};

export default ContentAction;
