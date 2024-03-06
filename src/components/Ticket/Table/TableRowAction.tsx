"use client";

import { Row } from "@tanstack/react-table";
import React, { useCallback, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DotsThree, Pencil, Trash } from "@phosphor-icons/react";
import { TicketSchema } from "../Schema";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteTicketById } from "@/lib/actions/ticketAction";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface TableRowActionProps<TData> {
  row: Row<TData>;
}

export function TableRowAction<TData>({ row }: TableRowActionProps<TData>) {
  const ticket = TicketSchema.parse(row.original);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const router = useRouter();

  const onDeleteTicketHandler = useCallback(
    async (id: string) => {
      const { status, message } = await deleteTicketById(id);
      if (status !== "success") {
        toast.error(message);
        return;
      }
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
              onClick={() => alert("Edit-" + ticket.id)}
            >
              <Pencil size={16} />
              Edit
            </button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem>
              <button className="flex items-center gap-1 w-full">
                <Trash size={16} />
                Hapus
              </button>
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent className="bg-white">
        <div className="flex flex-col gap-5 items-center justify-center">
          <h1 className="text-xl">Yakin ingin menghapus tiket ini?</h1>
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
              variant={"primary"}
              onClick={() => onDeleteTicketHandler(ticket.id)}
            >
              Hapus
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
