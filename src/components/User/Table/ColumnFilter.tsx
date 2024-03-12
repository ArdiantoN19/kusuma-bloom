import { DataTableFacetedFilter } from "@/components/DataTable/DataTableFacetedFilter";
import { ROLE } from "@/types/authAction";
import { User, UserGear } from "@phosphor-icons/react/dist/ssr";
import { Table } from "@tanstack/react-table";

interface ColumnFilterProps<TData> {
  table: Table<TData>;
}

export const roles = [
  {
    value: ROLE.ADMIN,
    label: "Admin",
    icon: UserGear,
  },
  {
    value: ROLE.REGULAR,
    label: "Regular",
    icon: User,
  },
];

export function ColumnFilter<TData>({ table }: ColumnFilterProps<TData>) {
  return (
    table.getColumn("role") && (
      <DataTableFacetedFilter
        column={table.getColumn("role")}
        title="Role"
        options={roles}
      />
    )
  );
}
