"use client";

import { DataTableToolbar } from "@/components/DataTable/DataTableToolbar";
import { ColumnFilter } from "./ColumnFilter";
import { Table } from "@tanstack/react-table";
import DataTableWrapper from "@/components/DataTable/DataTableWrapper";

interface UserTableWrapperProps<TData> {
  table: Table<TData>;
}

function UserTableWrapper<TData>({ table }: UserTableWrapperProps<TData>) {
  return (
    <DataTableToolbar table={table} searchKeyword="name">
      <ColumnFilter table={table} />
    </DataTableToolbar>
  );
}

export default DataTableWrapper(UserTableWrapper);
