"use client";

import { Table } from "@tanstack/react-table";
import { Input } from "../ui/input";
import { FormEvent } from "react";
import { Button } from "../ui/button";
import { X } from "@phosphor-icons/react";
import { DataTableViewOptions } from "./DataTableViewOptions";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  children?: React.ReactNode;
}

export function DataTableToolbar<TData>({
  table,
  children,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const onChangeSearchHandler = (e: FormEvent<HTMLInputElement>): void => {
    table.getColumn("title")?.setFilterValue(e.currentTarget.value);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search..."
          className="h-8 w-[150px] lg:w-[250px] bg-white"
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={onChangeSearchHandler}
        />
        {children}
        {isFiltered && (
          <Button
            variant={"primary"}
            className="h-8 px-2 lg:px-3"
            onClick={() => table.resetColumnFilters()}
          >
            <X size={16} />
            Reset
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
