"use client";

import { Row } from "@tanstack/react-table";
import { UserSchema } from "../Schema";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import FormEditUser from "../FormEditUser";

interface TableRowActionProps<TData> {
  row: Row<TData>;
}

export function TableRowAction<TData>({ row }: TableRowActionProps<TData>) {
  const user = UserSchema.parse(row.original);
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
      <DialogContent className="bg-white max-w-md overflow-auto max-h-[95dvh]">
        {statusDialog === "edit" ? (
          <FormEditUser user={user} setOpenDialog={setOpenDialog} />
        ) : (
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
        )}
      </DialogContent>
    </Dialog>
  );
}
