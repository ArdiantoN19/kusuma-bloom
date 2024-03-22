import { DataTableFacetedFilter } from "@/components/DataTable/DataTableFacetedFilter";
import { CheckCircle, Users } from "@phosphor-icons/react/dist/ssr";
import { Table } from "@tanstack/react-table";

interface ColumnFilterProps<TData> {
  table: Table<TData>;
}

export const category_ages = [
  {
    value: "<5",
    label: "< 5 Tahun",
    icon: CheckCircle,
  },
  {
    value: "5-30",
    label: "5-30 Tahun",
    icon: CheckCircle,
  },
  {
    value: ">30",
    label: "> 30 Tahun",
    icon: CheckCircle,
  },
];

export const capacities = [
  {
    value: "<5",
    label: "< 5 Orang",
    icon: Users,
  },
  {
    value: "5-30",
    label: "5-30 Orang",
    icon: Users,
  },
  {
    value: ">30",
    label: "> 30 Orang",
    icon: Users,
  },
];

export function ColumnFilter<TData>({ table }: ColumnFilterProps<TData>) {
  return (
    <div className="flex gap-2">
      {table.getColumn("category_age") && (
        <DataTableFacetedFilter
          column={table.getColumn("category_age")}
          title="Umur"
          options={category_ages}
        />
      )}
      {table.getColumn("capacities") && (
        <DataTableFacetedFilter
          column={table.getColumn("capacities")}
          title="Kapasitas"
          options={capacities}
        />
      )}
    </div>
  );
}
