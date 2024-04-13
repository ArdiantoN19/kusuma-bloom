import { DataTableFacetedFilter } from "@/components/DataTable/DataTableFacetedFilter";
import { TRANSACTION_STATUS } from "@/types/transactionAction";
import { ArrowsHorizontal, Check, X } from "@phosphor-icons/react";
import { Table } from "@tanstack/react-table";
import React from "react";

const statuses = [
  {
    value: TRANSACTION_STATUS.SUCCESS,
    label: TRANSACTION_STATUS.SUCCESS,
    icon: Check,
  },
  {
    value: TRANSACTION_STATUS.PENDING,
    label: TRANSACTION_STATUS.PENDING,
    icon: ArrowsHorizontal,
  },
  {
    value: TRANSACTION_STATUS.FAILURE,
    label: TRANSACTION_STATUS.FAILURE,
    icon: X,
  },
];

interface ColumnFilterProps<TData> {
  table: Table<TData>;
}

function ColumnFilter<TData>({ table }: ColumnFilterProps<TData>) {
  return (
    <DataTableFacetedFilter
      options={statuses}
      column={table.getColumn("status")}
      title="Status"
    />
  );
}

export default ColumnFilter;
