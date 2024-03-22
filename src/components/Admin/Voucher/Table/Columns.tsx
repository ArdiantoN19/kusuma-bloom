"use client";

import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import { VoucherSchema } from "../Schema";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/DataTable/DataTableColumnHeader";
import { statuses } from "./ColumnFilter";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { printColor } from "@/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TableRowAction } from "./TableRowAction";

export const columns: ColumnDef<z.infer<typeof VoucherSchema>>[] = [
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
      <DataTableColumnHeader column={column} title="Voucher ID" />
    ),
    cell: ({ row }) => (
      <div className="w-[120px] truncate" title={row.getValue("id")}>
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
      <div className="w-[150px] truncate" title={row.getValue("name")}>
        {row.getValue("name")}
      </div>
    ),
  },
  {
    accessorKey: "total",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total" />
    ),
    cell: ({ row }) => <div className="w-[90px]">{row.getValue("total")}</div>,
  },
  {
    accessorKey: "discount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Diskon" />
    ),
    cell: ({ row }) => {
      const discount = (row.getValue("discount") as number) * 100;
      return <div className="w-[90px]">{discount}%</div>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      ) as { value: boolean; label: string; icon: any };

      return (
        <Badge
          className={cn(
            status.value
              ? "bg-primary hover:bg-green-500/90"
              : "bg-red-400 hover:bg-red-400/90"
          )}
        >
          <div className="flex gap-1 items-center">
            <status.icon size={16} />
            {status?.label}
          </div>
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "createdBy",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Dibuat Oleh" />
    ),
    cell: ({ row }) => (
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
          <AvatarFallback>{row.original.user.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <p className="text-sm font-medium leading-none">
          {row.original.user.name}
        </p>
      </div>
    ),
  },
  {
    id: "action",
    cell: ({ row }) => <TableRowAction row={row} />,
  },
];
