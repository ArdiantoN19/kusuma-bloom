import { DataTableFacetedFilter } from "@/components/DataTable/DataTableFacetedFilter";
import { GENDER } from "@/lib/actions/userAction/Validator";
import { ROLE } from "@/types/authAction";
import {
  GenderFemale,
  GenderMale,
  User,
  UserGear,
} from "@phosphor-icons/react/dist/ssr";
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

export const genders = [
  {
    value: GENDER.MALE,
    label: "Pria",
    icon: GenderMale,
  },
  {
    value: GENDER.FEMALE,
    label: "Wanita",
    icon: GenderFemale,
  },
];

export function ColumnFilter<TData>({ table }: ColumnFilterProps<TData>) {
  return (
    <div className="flex gap-2">
      {table.getColumn("role") && (
        <DataTableFacetedFilter
          column={table.getColumn("role")}
          title="Role"
          options={roles}
        />
      )}
      {table.getColumn("gender") && (
        <DataTableFacetedFilter
          column={table.getColumn("gender")}
          title="Jenis Kelamin"
          options={genders}
        />
      )}
    </div>
  );
}
