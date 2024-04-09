"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TransactionSchema } from "../Schema";
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/DataTable/DataTableColumnHeader";
import { dateFormatter, rupiahFormatter } from "@/utils";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowsHorizontal, Check, X } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

export const columns: ColumnDef<z.infer<typeof TransactionSchema>>[] = [
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
      <DataTableColumnHeader column={column} title="Transaction ID" />
    ),
    cell: ({ row }) => (
      <div className=" w-[130px] truncate" title={row.original.id}>
        {row.original.id}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kuantiti" />
    ),
    cell: ({ row }) => <div className="w-8">{row.getValue("quantity")}</div>,
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Harga" />
    ),
    cell: ({ row }) => (
      <div className="min-w-24">{rupiahFormatter(row.getValue("price"))}</div>
    ),
  },
  {
    accessorKey: "gross_amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total" />
    ),
    cell: ({ row }) => (
      <div className="min-w-24">
        {rupiahFormatter(row.getValue("gross_amount"))}
      </div>
    ),
  },
  {
    accessorKey: "memberUser",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Diskon Member" />
    ),
    cell: ({ row }) => {
      const total = row.original.price * row.original.quantity;
      const discountMember = row.original.memberUser
        ? total * row.original.memberUser.discount
        : 0;
      return (
        <div className="min-w-24">
          {discountMember ? rupiahFormatter(discountMember) : "-"}
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "voucher",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Diskon Voucher" />
    ),
    cell: ({ row }) => {
      const total = row.original.price * row.original.quantity;
      const discountVoucher = row.original.voucher
        ? total * row.original.voucher.discount
        : 0;
      return (
        <div className="min-w-24">
          {discountVoucher ? rupiahFormatter(discountVoucher) : "-"}
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status Pembayaran" />
    ),
    cell: ({ row }) => {
      const statuses = [
        {
          label: "SUCCESS",
          icon: Check,
          className: "bg-primary hover:bg-primary",
        },
        {
          label: "FAILURE",
          icon: X,
          className: "bg-red-400 hover:bg-red-400",
        },
        {
          label: "PENDING",
          icon: ArrowsHorizontal,
          className: "bg-myOrange hover:bg-myOrange",
        },
      ];

      return statuses
        .filter((status) => status.label === row.getValue("status"))
        .map((status) => (
          <Badge key={status.label} className={cn(status.className, "gap-x-1")}>
            <status.icon className="size-4" /> {status.label}
          </Badge>
        ));
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "payment_type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Metode Pembayaran" />
    ),
    cell: ({ row }) => (
      <div className="min-w-16 uppercase">
        {row.original.payment_type || "-"}
      </div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "expired",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tanggal Berlaku" />
    ),
    cell: ({ row }) => (
      <div className="min-w-20">
        {new Date() > new Date(row.original.expired) ? (
          <Badge className="bg-red-400 hover:bg-red-400">Expired</Badge>
        ) : (
          dateFormatter(row.original.expired.toDateString()).slice(0, -7)
        )}
      </div>
    ),
  },
  {
    accessorKey: "scanTickets",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status Tiket" />
    ),
    cell: ({ row }) => {
      const statusColor: Record<number, string> = {
        0: "bg-red-400 hover:bg-red-400",
        1: "bg-primary hover:bg-primary",
      };
      if (!row.original.scanTickets) {
        return <div>-</div>;
      }
      return (
        <Badge className={statusColor[Number(row.original.scanTickets.status)]}>
          {row.original.scanTickets.status ? "Teraktivasi" : "Belum Diaktivasi"}
        </Badge>
      );
    },
  },
  {
    id: "orderBy",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Dipesan Oleh" />
    ),
    cell: ({ row }) => (
      <div className="min-w-[150px]">
        <div className="flex items-center gap-x-1">
          <Avatar>
            <AvatarImage src={row.original.user.image} />
            <AvatarFallback>
              {row.original.user.name.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm">{row.original.user.name}</span>
        </div>
      </div>
    ),
    enableSorting: false,
  },
];
