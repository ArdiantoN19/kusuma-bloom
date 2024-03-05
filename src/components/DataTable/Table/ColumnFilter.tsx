import { Table } from "@tanstack/react-table";
import { DataTableFacetedFilter } from "../DataTableFacetedFilter";
import { priorities, statuses } from "./Columns";

interface ColumnFilterProps<TData> {
  table: Table<TData>;
}

export function ColumnFilter<TData>({ table }: ColumnFilterProps<TData>) {
  return (
    <div className="flex gap-2">
      {table.getColumn("status") && (
        <DataTableFacetedFilter
          column={table.getColumn("status")}
          title="Status"
          options={statuses}
        />
      )}
      {table.getColumn("priority") && (
        <DataTableFacetedFilter
          column={table.getColumn("priority")}
          title="Priority"
          options={priorities}
        />
      )}
    </div>
  );
}
