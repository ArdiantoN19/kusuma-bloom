"use client";

import { DataTableToolbar } from "@/components/DataTable/DataTableToolbar";
import DataTableWrapper from "@/components/DataTable/DataTableWrapper";
import { Table } from "@tanstack/react-table";
import React from "react";
import ColumnFilter from "./ColumnFilter";

interface TransactionTableWrapperProps<TData> {
  table: Table<TData>;
}

function TransactionTableWrapper<TData>({
  table,
}: TransactionTableWrapperProps<TData>) {
  return (
    <DataTableToolbar table={table} searchKeyword="id">
      <ColumnFilter table={table} />
    </DataTableToolbar>
  );
}

export default DataTableWrapper(TransactionTableWrapper);
