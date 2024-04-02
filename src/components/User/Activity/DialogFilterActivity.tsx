"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SlidersHorizontal } from "@phosphor-icons/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { createQueryString } from "@/utils";

const FormOrderBySchema = z.object({
  orderBy: z.string(),
});

const DialogFilterActivity = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const form = useForm<z.infer<typeof FormOrderBySchema>>({
    resolver: zodResolver(FormOrderBySchema),
    defaultValues: {
      orderBy: searchParams.get("orderBy") || "newest",
    },
  });

  useEffect(() => {
    if (searchParams.get("orderBy")) {
      form.setValue("orderBy", searchParams.get("orderBy")!);
    }
  }, [form, searchParams]);

  const onSubmitHandler = (data: z.infer<typeof FormOrderBySchema>) => {
    let queryString: string = "";
    if (searchParams.get("status")) {
      queryString = createQueryString(pathname, [
        { key: "status", value: searchParams.get("status")! },
        { key: "orderBy", value: data.orderBy },
      ]);
    } else {
      queryString = createQueryString(pathname, [
        { key: "orderBy", value: data.orderBy },
      ]);
    }
    router.push(queryString);
    router.refresh();
  };

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
            Urutkan activitas transaksi Anda
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="space-y-5"
            onSubmit={form.handleSubmit(onSubmitHandler)}
          >
            <FormField
              name="orderBy"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Urutkan dari</FormLabel>
                  <FormControl>
                    <RadioGroup
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      className="space-y-1"
                    >
                      <FormItem className="flex items-center space-x-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="newest" />
                        </FormControl>
                        <FormLabel className="font-normal">Terbaru</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="oldest" />
                        </FormControl>
                        <FormLabel className="font-normal">Terlama</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
            <Button variant={"primary"} type="submit" className="w-full mt-10">
              Filter
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogFilterActivity;
