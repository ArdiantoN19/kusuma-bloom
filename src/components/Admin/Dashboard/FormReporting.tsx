"use client";

import React from "react";
import { Button } from "../../ui/button";
import { DownloadSimple } from "@phosphor-icons/react/dist/ssr";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "@phosphor-icons/react";
import { Calendar } from "../../ui/calendar";

const FormSchema = z.object({
  date: z
    .object(
      {
        from: z.date().optional(),
        to: z.date().optional(),
      },
      {
        required_error: "Tanggal harus diisi",
        invalid_type_error: "Format tanggal salah",
      }
    )
    .refine((date) => !!date.from && !!date.to, {
      // check if both from and to are not undefined
      message: "Tanggal harus diisi",
    }),
});

const FormReporting = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      date: {
        from: undefined,
        to: undefined,
      },
    },
  });

  const onSubmitHandler = (data: z.infer<typeof FormSchema>) => {
    alert(JSON.stringify(data));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitHandler)} className="space-y-8">
        <FormField
          name="date"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Range tanggal</FormLabel>
              <Popover>
                <FormControl>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"ghost"}
                      className={cn(
                        "w-full flex border justify-between font-normal shadow-sm",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value?.from ? (
                        field.value.to ? (
                          <>
                            {format(field.value.from, "LLL dd, y")} -
                            {format(field.value.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(field.value.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Pilih tanggal</span>
                      )}
                      <CalendarIcon size={16} />
                    </Button>
                  </PopoverTrigger>
                </FormControl>
                <PopoverContent align="center" className="w-full p-0">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={field.value?.from}
                    selected={{ from: field.value.from!, to: field.value.to }}
                    onSelect={field.onChange}
                    numberOfMonths={1}
                    disabled={(date) => date < new Date("2024-01-01")}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="pt-8">
          <Button type="submit" variant={"primary"} className="ml-auto">
            <DownloadSimple size={20} /> Cetak
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FormReporting;
