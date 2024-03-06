import { DataTableFacetedFilter } from "@/components/DataTable/DataTableFacetedFilter";
import { CheckCircle, XCircle } from "@phosphor-icons/react/dist/ssr";
import { Table } from "@tanstack/react-table";

interface ColumnFilterProps<TData> {
  table: Table<TData>;
}

const statuses = [
  {
    value: false,
    label: "Tidak Aktif",
    icon: XCircle,
  },
  {
    value: true,
    label: "Aktif",
    icon: CheckCircle,
  },
];

export function ColumnFilter<TData>({ table }: ColumnFilterProps<TData>) {
  return (
    table.getColumn("status") && (
      <DataTableFacetedFilter
        column={table.getColumn("status")}
        title="Status"
        options={statuses}
      />
    )
  );
}
