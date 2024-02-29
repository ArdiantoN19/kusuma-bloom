"use client";

import React from "react";
import { Button } from "../ui/button";
import { DownloadSimple } from "@phosphor-icons/react/dist/ssr";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { months } from "@/utils/data";

const FormSchema = z.object({
  month: z
    .string({
      required_error: "Pilih bulan terlebih dahulu",
    })
    .min(0)
    .max(11),
});

const FormReporting = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmitHandler = (data: z.infer<typeof FormSchema>) => {
    alert(JSON.stringify(data));
  };

  return (
    <div className="grid gap-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitHandler)}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="month"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bulan</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="--Pilih bulan--" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {months.map((month: { id: number; name: string }) => (
                      <SelectItem value={String(month.id)} key={month.id}>
                        {month.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Pilih bulan yang ingin ditarik laporannya.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <Button
              type="submit"
              className="flex ml-auto items-center gap-1 bg-gradient-primary border border-black btn-shadow"
            >
              <DownloadSimple size={20} /> Cetak
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FormReporting;
