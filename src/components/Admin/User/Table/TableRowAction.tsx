"use client";

import { Row } from "@tanstack/react-table";
import { UserSchema } from "../Schema";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Circle, DotsThree, Pencil, Trash } from "@phosphor-icons/react";
import { deleteUserByIdAction } from "@/lib/actions/userAction";
import ContentAction from "./ContentAction";
import { useSession } from "next-auth/react";
import {
  deleteMemberUserByIdAction,
  verifyMemberUserAction,
} from "@/lib/actions/memberUserAction";

interface TableRowActionProps<TData> {
  row: Row<TData>;
}

export function TableRowAction<TData>({ row }: TableRowActionProps<TData>) {
  const user = UserSchema.parse(row.original);
  const { data: session } = useSession();

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const router = useRouter();
  const [statusDialog, setStatusDialog] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onDeleteUserHandler = useCallback(
    async (id: string) => {
      setIsLoading(true);
      const { status, message } = await deleteUserByIdAction(id);
      if (status !== "success") {
        toast.error(message);
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      toast.success(message);
      setOpenDialog((prev) => !prev);
      router.refresh();
    },
    [router]
  );

  const onVerifyMemberUserHandler = useCallback(
    async (userId: string) => {
      setIsLoading(true);
      const payload = {
        userId,
        acceptedBy: session?.user.userId,
      };
      const response = await verifyMemberUserAction(payload);
      if (response.status !== "success") {
        toast.error(response.message);
        setIsLoading(false);
        return;
      }
      toast.success(response.message);
      setOpenDialog(false);
      setIsLoading(false);
      router.refresh();
    },
    [session, router]
  );

  const onDeleteMemberUserHandler = useCallback(
    async (userId: string) => {
      setIsLoading(true);
      const payload = {
        userId,
        acceptedBy: session?.user.userId,
      };
      const response = await deleteMemberUserByIdAction(payload);
      if (response.status !== "success") {
        toast.error(response.message);
        setIsLoading(false);
        return;
      }
      toast.success(response.message);
      setOpenDialog(false);
      setIsLoading(false);
      router.refresh();
    },
    [session, router]
  );

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={"ghost"}
            className="size-8 flex p-0 data-[state=open]:bg-myGreen2/50"
          >
            <DotsThree size={16} className="size-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[100px]">
          <DropdownMenuItem>
            <button
              className="flex items-center gap-1 w-full"
              onClick={() => {
                setStatusDialog(() => "edit");
                setOpenDialog((prev) => !prev);
              }}
            >
              <Pencil size={16} />
              Edit
            </button>
          </DropdownMenuItem>
          {user?.memberUsers && (
            <DropdownMenuItem>
              <button
                className="flex items-center gap-1 w-full"
                onClick={() => {
                  setStatusDialog(() => "member");
                  setOpenDialog((prev) => !prev);
                }}
              >
                <Circle size={16} weight="fill" className="animate-pulse" />
                Verify
              </button>
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem>
              <button
                className="flex items-center gap-1 w-full"
                onClick={() => setStatusDialog(() => "delete")}
              >
                <Trash size={16} />
                Hapus
              </button>
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent className="bg-white max-w-[350px] md:min-w-[350px] md:max-w-md rounded overflow-auto max-h-[95dvh]">
        <ContentAction
          statusDialog={statusDialog}
          setOpenDialog={setOpenDialog}
          user={user}
          onDeleteUserHandler={onDeleteUserHandler}
          isLoading={isLoading}
          onVerifyMemberUserHandler={onVerifyMemberUserHandler}
          onDeleteMemberUserHandler={onDeleteMemberUserHandler}
        />
      </DialogContent>
    </Dialog>
  );
}
