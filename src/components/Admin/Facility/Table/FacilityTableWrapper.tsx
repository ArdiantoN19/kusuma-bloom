"use client";

import { DataTableToolbar } from "@/components/DataTable/DataTableToolbar";
import { Table } from "@tanstack/react-table";
import { ColumnFilter } from "./ColumnFilter";
import DataTableWrapper from "@/components/DataTable/DataTableWrapper";

interface FacilityTableWrapperProps<TData> {
  table: Table<TData>;
}

function FacilityTableWrapper<TData>({
  table,
}: FacilityTableWrapperProps<TData>) {
  return (
    <DataTableToolbar table={table} searchKeyword="name">
      <ColumnFilter table={table} />
    </DataTableToolbar>
  );
}

export default DataTableWrapper(FacilityTableWrapper);
