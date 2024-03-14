"use client";

import React, { useCallback, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import {
  Calendar as CalendarIcon,
  Check,
  Circle,
  Eraser,
  Plus,
  Ticket,
} from "@phosphor-icons/react";
import { FormTicketSchema } from "@/lib/actions/ticketAction/validator";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { addDays, format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { useSession } from "next-auth/react";
import { PayloadBodyTicket, ResponseTicketAction } from "@/types/ticketAction";
import { addTicketAction } from "@/lib/actions/ticketAction";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useRouter } from "next/navigation";

const FormAddTicket = () => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof FormTicketSchema>>({
    resolver: zodResolver(FormTicketSchema),
    defaultValues: {
      name: "",
      quantity: "",
      price: "",
      status: false,
      date: {
        from: undefined,
        to: undefined,
      },
    },
  });

  const onFormReset = useCallback(() => {
    form.reset({
      name: "",
      price: "",
      quantity: "",
      status: false,
      date: {
        from: undefined,
        to: undefined,
      },
    });
  }, [form]);

  const onSubmitHandler = async (data: z.infer<typeof FormTicketSchema>) => {
    const payload: PayloadBodyTicket = {
      quantity: Number(data.quantity),
      price: Number(data.price),
      fromDate: data.date.from as Date,
      toDate: data.date.to as Date,
      userId: session?.user.userId,
      status: data.status,
      name: data.name,
    };

    setIsLoading(true);
    const { status, message }: ResponseTicketAction = await addTicketAction(
      payload
    );
    if (status === "success") {
      setOpenDialog((prev) => !prev);
      onFormReset();
      toast.success(message);
      router.refresh();
    } else {
      toast.error(message);
    }
    setIsLoading(false);
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button variant={"primary"}>
          <Plus size={20} />
          Tambah Tiket
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-1">
            <Ticket size={20} />
            Tambah Tiket
          </DialogTitle>
          <DialogDescription>
            Anda bisa menambahkan tiket disini.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitHandler)}
            className="space-y-4"
          >
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kuantiti</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Harga</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                            "w-full flex items-center justify-between border shadow-sm font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value?.from ? (
                            field.value.to ? (
                              <>
                                {format(field.value.from, "eee, dd LLL y")} -{" "}
                                {format(field.value.to, "eee, dd LLL y")}
                              </>
                            ) : (
                              format(field.value.from, "eee, dd LLL y")
                            )
                          ) : (
                            <span>Pilih range tanggal</span>
                          )}
                          <CalendarIcon size={16} />
                        </Button>
                      </PopoverTrigger>
                    </FormControl>
                    <PopoverContent align={"center"} className="w-full p-0">
                      <Select
                        onValueChange={(value) =>
                          field.onChange({
                            from: new Date(),
                            to: addDays(new Date(), Number(value)),
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Preset" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          <SelectItem value="30">1 Bulan</SelectItem>
                        </SelectContent>
                      </Select>
                      <Calendar
                        initialFocus
                        defaultMonth={field.value?.from}
                        mode="range"
                        selected={{
                          from: field.value?.from!,
                          to: field.value?.to,
                        }}
                        onSelect={field.onChange}
                        numberOfMonths={2}
                        disabled={(date) => date < new Date("2024-01-01")}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end items-center gap-2 pt-8">
              <Button
                type="reset"
                variant={"primary"}
                className="bg-muted-foreground hover:bg-muted-foreground"
                onClick={onFormReset}
              >
                <Eraser size={20} /> Clear
              </Button>
              <Button type="submit" variant={"primary"} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Circle size={20} className="animate-pulse" /> Loading...
                  </>
                ) : (
                  <>
                    <Check size={20} /> Submit
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default FormAddTicket;
