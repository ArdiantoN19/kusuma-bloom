"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SlidersHorizontal } from "@phosphor-icons/react";
import React from "react";

const DialogFilterActivity = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" className="size-5" title="filter">
          <SlidersHorizontal size={20} weight="bold" />
        </button>
      </DialogTrigger>
      <DialogContent className="w-[350px] md:max-w-md bg-white rounded">
        <DialogHeader className="text-start">
          <DialogTitle>Filter Aktifitas</DialogTitle>
          <DialogDescription>
            Anda dapat mengatur filter aktifitas
          </DialogDescription>
        </DialogHeader>
        <form>
          <div>
            <Checkbox checked={true} onCheckedChange={() => null} />
            Terbaru
          </div>
          <div>
            <Checkbox checked={false} onCheckedChange={() => null} />
            Terlama
          </div>
          <button
            className="block mt-8 w-full rounded px-2 py-2 border border-primary text-sm text-primary text-center"
            type="submit"
          >
            Filter
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogFilterActivity;
