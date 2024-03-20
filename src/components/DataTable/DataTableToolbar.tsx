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
  searchKeyword: string;
}

export function DataTableToolbar<TData>({
  table,
  children,
  searchKeyword,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const onChangeSearchHandler = (e: FormEvent<HTMLInputElement>): void => {
    table.getColumn(searchKeyword)?.setFilterValue(e.currentTarget.value);
  };

  return (
    <div className="flex md:items-center justify-between flex-col md:flex-row">
      <div className="flex md:flex-1 md:items-center md:space-x-2 flex-col space-y-2 md:space-y-0 md:flex-row">
        <Input
          placeholder="Search..."
          className="h-8 w-full md:w-[150px] lg:w-[250px] bg-white"
          value={
            (table.getColumn(searchKeyword)?.getFilterValue() as string) ?? ""
          }
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
