"use client";

import DataTableWrapper from "@/components/DataTable/DataTableWrapper";
import { DataTableToolbar } from "@/components/DataTable/DataTableToolbar";
import { ColumnFilter } from "./ColumnFilter";

function TicketTableWrapper({ table }: any) {
  return (
    <DataTableToolbar table={table} searchKeyword={"name"}>
      <ColumnFilter table={table} />
    </DataTableToolbar>
  );
}
export default DataTableWrapper(TicketTableWrapper);
