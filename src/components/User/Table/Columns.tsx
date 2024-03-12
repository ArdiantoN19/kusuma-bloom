"use client";

import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import { UserSchema } from "../Schema";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/DataTable/DataTableColumnHeader";
import { Badge } from "@/components/ui/badge";
import { ROLE } from "@/types/authAction";
import Image from "next/image";
import { roles } from "./ColumnFilter";
import { TableRowAction } from "./TableRowAction";

export const columns: ColumnDef<z.infer<typeof UserSchema>>[] = [
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
      <DataTableColumnHeader column={column} title="User ID" />
    ),
    cell: ({ row }) => (
      <div className="w-[130px] truncate" title={row.getValue("id")}>
        {row.getValue("id")}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "image",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Image" />
    ),
    cell: ({ row }) => (
      <div className="size-[60px] bg-transparent">
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
      <div className="w-[120px] truncate" title={row.getValue("name")}>
        {row.getValue("name")}
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px] truncate" title={row.getValue("email")}>
        {row.getValue("email")}
      </div>
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => {
      const role = roles.find(
        (role) => role.value === row.getValue("role")
      ) as { value: ROLE; label: string; icon: any };

      return (
        <div className="w-[100px]">
          {role?.value === ROLE.ADMIN ? (
            <Badge className="bg-red-400 hover:bg-red-400/90 flex gap-1 items-center">
              <role.icon size={16} />
              {role.label}
            </Badge>
          ) : (
            <Badge className="bg-primary hover:bg-green-500/90 flex gap-1">
              <role.icon size={16} />
              {role.label}
            </Badge>
          )}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "action",
    cell: ({ row }) => <TableRowAction row={row} />,
  },
];
