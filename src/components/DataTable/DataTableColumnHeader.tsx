import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  EyeSlash,
  ArrowDown,
  ArrowUp,
  CaretUpDown,
} from "@phosphor-icons/react/dist/ssr";
import { Column } from "@tanstack/react-table";
import React, { HTMLAttributes } from "react";

interface DataTableColumnHeaderProps<TData, TValue>
  extends HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={"ghost"}
            size={"sm"}
            className="-ml-3 h-8 data-[state=open]:bg-accent space-x-2"
          >
            <span>{title}</span>
            {column.getIsSorted() === "desc" ? (
              <ArrowDown size={16} />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUp size={16} />
            ) : (
              <CaretUpDown size={16} />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUp
              size={16}
              className="mr-2 size-4 text-muted-foreground/70"
            />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDown
              size={16}
              className="mr-2 size-4 text-muted-foreground/70"
            />
            Desc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <EyeSlash
              size={16}
              className="text-muted-foreground/70 mr-2 size-4"
            />{" "}
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
