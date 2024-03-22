"use client";

import { DataTableColumnHeader } from "@/components/DataTable/DataTableColumnHeader";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { calculateDaysLeft, printColor, rupiahFormatter } from "@/utils";
import { CheckCircle, XCircle } from "@phosphor-icons/react";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { z } from "zod";
import { TicketSchema } from "../Schema";
import { TableRowAction } from "./TableRowAction";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export const columns: ColumnDef<z.infer<typeof TicketSchema>>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ticket ID" />
    ),
    cell: ({ row }) => (
      <div className=" w-[130px] truncate" title={row.getValue("id")}>
        {row.getValue("id")}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama" />
    ),
    cell: ({ row }) => (
      <div className="w-[130px] truncate">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kuantiti" />
    ),
    cell: ({ row }) => (
      <div className="w-[100px]">{row.getValue("quantity")}</div>
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Harga" />
    ),
    cell: ({ row }) => (
      <div className="w-[100px]">{rupiahFormatter(row.getValue("price"))}</div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <Badge
          className={
            status
              ? "bg-primary hover:bg-green-500/90"
              : "bg-red-400 hover:bg-red-400/90"
          }
        >
          {status ? (
            <div className="flex gap-1 items-center">
              <CheckCircle size={16} />
              Aktif
            </div>
          ) : (
            <div className="flex gap-1 items-center">
              <XCircle size={16} />
              Tidak Aktif
            </div>
          )}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Range Tanggal" />
    ),
    cell: ({ row }) => {
      const fromDate: Date = row.original.fromDate;
      const toDate: Date = row.original.toDate;
      return (
        <div className="w-[200px] ">
          {format(fromDate, "dd LLL y")} - {format(toDate, "dd LLL y")}
        </div>
      );
    },
  },
  {
    id: "dayLeft",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sisa Hari" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status");
      const dayLeft = calculateDaysLeft(row.original.toDate.toString());
      return status && dayLeft >= 0 ? (
        <Badge
          className={
            dayLeft <= 5
              ? "bg-red-400 hover:bg-red-400/90"
              : dayLeft > 5 && dayLeft <= 15
              ? "bg-orange-400 hover:bg-orange-400/90"
              : "bg-primary hover:bg-green-500/90"
          }
        >
          {dayLeft} hari
        </Badge>
      ) : (
        <div>
          {dayLeft < 0 ? (
            <Badge className="bg-red-400 hover:bg-red-400/90">expired</Badge>
          ) : (
            "-"
          )}
        </div>
      );
    },
  },
  {
    id: "createdBy",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Dibuat Oleh" />
    ),
    cell: ({ row }) => {
      return (
        <div
          className={cn(
            "flex items-center gap-1 rounded-full py-1 px-1.5 shadow-sm",
            printColor()
          )}
        >
          <Avatar className="size-8">
            <AvatarImage
              src={row.original.user.image}
              alt={row.original.user.name}
            />
            <AvatarFallback>
              {row.original.user.name.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <p className="text-sm font-medium leading-none">
            {row.original.user.name}
          </p>
        </div>
      );
    },
  },
  {
    id: "action",
    cell: ({ row }) => {
      const isTicketExpired = row.original.toDate < new Date();
      return !isTicketExpired && <TableRowAction row={row} />;
    },
  },
];
