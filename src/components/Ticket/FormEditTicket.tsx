"use client";

import React, { FunctionComponent, useCallback, useState } from "react";
import { DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import {
  Check,
  Circle,
  Eraser,
  Ticket,
  Calendar as CalendarIcon,
  ArrowUpRight,
} from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { validator } from "@/lib/actions/ticketAction/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { PayloadBodyTicket } from "@/types/ticketAction";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { addDays, format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Calendar } from "../ui/calendar";
import { Input } from "../ui/input";
import {
  activateTicketByIdAction,
  updateTicketByIdAction,
} from "@/lib/actions/ticketAction";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface FormEditTicketProps extends PayloadBodyTicket {
  id: string;
  setOpenDialog: (prev: boolean) => any;
}

const FormEditTicket: FunctionComponent<FormEditTicketProps> = (props) => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof validator.FormTicketSchema>>({
    resolver: zodResolver(validator.FormTicketSchema),
    defaultValues: {
      name: props.name,
      quantity: String(props.quantity),
      price: String(props.price),
      status: props.status,
      date: {
        from: props.fromDate,
        to: props.toDate,
      },
    },
  });

  const onFormReset = useCallback(() => {
    form.reset({
      name: "",
      quantity: "",
      price: "",
      status: props.status,
      date: {
        from: undefined,
        to: undefined,
      },
    });
  }, [form, props.status]);

  const onActivateTicketHandler = useCallback(
    async (id: string) => {
      if (!props.status) {
        setIsLoading(true);
        const response = await activateTicketByIdAction(id);
        if (response.status !== "success") {
          toast.error(response.message);
          return;
        }

        setIsLoading(false);
        toast.success(response.message);
        router.refresh();
        return;
      }
      toast.success("Tiket sudah dalam keadaan aktif");
    },
    [router, props.status]
  );

  const onSubmitHandler = async (
    data: z.infer<typeof validator.FormTicketSchema>
  ) => {
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
    const response = await updateTicketByIdAction(props.id, payload);
    if (response.status === "success") {
      props.setOpenDialog(false);
      onFormReset();
      toast.success(response.message);
      router.refresh();
    } else {
      toast.error(response.message);
    }
    setIsLoading(false);
  };
  return (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-1">
          <Ticket size={20} />
          Edit Tiket
        </DialogTitle>
        <DialogDescription>Anda bisa mengubah tiket disini.</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit(onSubmitHandler)}
        >
          <Button
            type="button"
            variant={"primary"}
            className="bg-red-400 hover:bg-red-400/90"
            onClick={() => onActivateTicketHandler(props.id)}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Circle size={20} className="animate-pulse" /> Loading...
              </>
            ) : (
              <>
                <ArrowUpRight size={20} /> Aktifkan
              </>
            )}
          </Button>
          <FormDescription>
            Gunakan ini untuk mengaktifkan tiket
          </FormDescription>
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
    </>
  );
};

export default FormEditTicket;
