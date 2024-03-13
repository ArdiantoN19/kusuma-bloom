"use client";

import { DataTableToolbar } from "@/components/DataTable/DataTableToolbar";
import { Table } from "@tanstack/react-table";
import { ColumnFilter } from "./ColumnFilter";
import DataTableWrapper from "@/components/DataTable/DataTableWrapper";

interface VoucherTableWrapperProps<TData> {
  table: Table<TData>;
}

function VoucherTableWrapper<TData>({
  table,
}: VoucherTableWrapperProps<TData>) {
  return (
    <DataTableToolbar table={table} searchKeyword="name">
      <ColumnFilter table={table} />
    </DataTableToolbar>
  );
}

export default DataTableWrapper(VoucherTableWrapper);
