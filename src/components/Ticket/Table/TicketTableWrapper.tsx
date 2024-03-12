"use client";

import DataTableWrapper from "@/components/DataTable/DataTableWrapper";
import { DataTableToolbar } from "@/components/DataTable/DataTableToolbar";
import { ColumnFilter } from "./ColumnFilter";
import { Table } from "@tanstack/react-table";

interface TicketTableWrapperProps<TData> {
  table: Table<TData>;
}

function TicketTableWrapper<TData>({ table }: TicketTableWrapperProps<TData>) {
  return (
    <DataTableToolbar table={table} searchKeyword={"name"}>
      <ColumnFilter table={table} />
    </DataTableToolbar>
  );
}
export default DataTableWrapper(TicketTableWrapper);
