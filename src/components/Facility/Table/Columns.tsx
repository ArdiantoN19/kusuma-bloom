"use client";

import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import { FacilitySchema } from "../Schema";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/DataTable/DataTableColumnHeader";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { printColor } from "@/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TableRowAction } from "./TableRowAction";

export const columns: ColumnDef<z.infer<typeof FacilitySchema>>[] = [
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
      <DataTableColumnHeader column={column} title="Fasilitas ID" />
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
    accessorKey: "image",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gambar" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px] rounded-sm overflow-hidden h-[70px] bg-transparent">
        <Image
          src={row.getValue("image")}
          alt={row.getValue("name")}
          width={100}
          height={100}
          className="w-full h-full object-cover"
        />
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama" />
    ),
    cell: ({ row }) => (
      <div className="w-[120px]" title={row.getValue("name")}>
        {row.getValue("name")}
      </div>
    ),
  },
  {
    accessorKey: "category_age",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Range Umur" />
    ),
    cell: ({ row }) => (
      <div
        className="w-[80px] text-nowrap"
        title={row.getValue("category_age")}
      >
        {row.getValue("category_age")} Tahun
      </div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "capacities",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kapasitas" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px] text-nowrap" title={row.getValue("capacities")}>
        {row.getValue("capacities")} Orang
      </div>
    ),
    filterFn(row, id, value) {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Deskripsi" />
    ),
    cell: ({ row }) => (
      <div
        className="w-[150px] line-clamp-3 text-xs"
        title={row.getValue("description")}
      >
        {row.getValue("description")}
      </div>
    ),
    enableSorting: false,
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
    cell: ({ row }) => <TableRowAction row={row} />,
  },
];
