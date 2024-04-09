"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ResponseTicket } from "@/types/ticketAction";
import { ResponseVoucher } from "@/types/voucherAction";
import { createQueryString, rupiahFormatter } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowCircleRight,
  Calendar as CalendarIcon,
  Circle,
} from "@phosphor-icons/react";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormClaimVoucher from "./FormClaimVoucher";
import DetailOrderDialog from "./DetailOrderDialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const FormOrderSchema = z.object({
  date: z.date({ required_error: "Tanggal tiket harus diisi" }),
  quantity: z
    .string({ required_error: "Jumlah tiket harus diisi" })
    .min(1, { message: "Jumlah tiket harus diisi" }),
  price: z.string({ required_error: "Harga harus diisi" }),
});

interface FormOrderTicketProps {
  activeTicket: ResponseTicket | null;
  voucher: ResponseVoucher;
}

const FormDetailPemesananSkeleton = () => {
  return (
    <div className="space-y-3 text-sm">
      <div className="space-y-1">
        <p>Nama</p>
        <div className="w-full h-[36px] bg-muted animate-pulse rounded"></div>
      </div>
      <div className="space-y-1">
        <p>Email</p>
        <div className="w-full h-[36px] bg-muted animate-pulse rounded"></div>
      </div>
    </div>
  );
};

const FormOrderTicket: React.FC<FormOrderTicketProps> = ({
  activeTicket,
  voucher,
}) => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof FormOrderSchema>>({
    resolver: zodResolver(FormOrderSchema),
    defaultValues: {
      date: new Date(),
      quantity: "1",
      price: activeTicket?.price.toString() || "0",
    },
  });

  useEffect(() => {
    if (activeTicket?.price) {
      form.setValue("price", activeTicket.price.toString());
    }
  }, [activeTicket, form]);

  const total = activeTicket?.price! * Number(form.watch("quantity")) || 0;
  const discountVoucher = voucher ? total * voucher.discount : 0;
  const discountMember =
    session?.user.memberUser && session?.user.memberUser.discount
      ? total * session?.user.memberUser.discount
      : 0;

  const onSubmitHandler = useCallback(
    async (data: z.infer<typeof FormOrderSchema>) => {
      const payload = {
        ticketId: activeTicket?.id,
        ticketName: activeTicket?.name,
        user: {
          id: session?.user.userId,
          name: session?.user.name,
          email: session?.user.email,
        },
        memberUser: session?.user.memberUser,
        voucher,
        total,
        discountMember,
        discountVoucher,
        ...data,
      };

      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/transaction`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      const responseJson = await response.json();
      if (!response.ok) {
        toast.error(responseJson.message);
        return;
      }

      const queryString = createQueryString("/user/ticket/pay", [
        { key: "token", value: responseJson.data.token },
      ]);
      router.push(queryString);
      router.refresh();
      setIsLoading(false);
    },
    [
      activeTicket?.id,
      activeTicket?.name,
      session?.user.email,
      session?.user.memberUser,
      session?.user.name,
      session?.user.userId,
      total,
      voucher,
      discountMember,
      discountVoucher,
      router,
    ]
  );

  const detailOrderInformation = useMemo(
    () => ({
      user: {
        name: session?.user.name,
        email: session?.user.email,
      },
      discountMember,
      discountVoucher,
      quantity: Number(form.watch("quantity")),
      price: activeTicket?.price as number,
      date: form.watch("date"),
      total,
    }),
    [
      activeTicket?.price,
      discountMember,
      discountVoucher,
      form,
      session?.user.email,
      session?.user.name,
      total,
    ]
  );

  return (
    <div>
      <div className="mb-3">
        <h3 className="font-bold">Detail Tiket</h3>
        <p className="text-sm text-muted-foreground">
          Detail tiket ini digunakan untuk keperluan transaksi
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitHandler)}
          className="space-y-3 "
        >
          <div className="p-4 bg-white border shadow-sm rounded-lg space-y-3 mb-8">
            <FormField
              name="quantity"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jumlah Tiket</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="price"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Harga Tiket</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={rupiahFormatter(Number(field.value))}
                      readOnly
                      className="cursor-auto read-only:bg-slate-100/80"
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    Sisa tiket: {activeTicket?.quantity || 0}
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              name="date"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tanggal Tiket</FormLabel>
                  <Popover>
                    <FormControl>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"ghost"}
                          className={cn(
                            "flex items-center justify-between border shadow-sm font-normal w-full",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "eee, dd LLL y")
                          ) : (
                            <span>Silahkan pilih tanggal</span>
                          )}
                          <CalendarIcon size={16} />
                        </Button>
                      </PopoverTrigger>
                    </FormControl>
                    <PopoverContent align="center" className="w-full p-0">
                      <Calendar
                        initialFocus
                        defaultMonth={field.value}
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        numberOfMonths={1}
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mb-3">
            <h3 className="font-bold">Detail Pemesan</h3>
            <p className="text-sm text-muted-foreground">
              Detail pemesan akan terisi secara otomatis sesuai dengan akun
              profile
            </p>
          </div>
          <div className="p-4 bg-white border shadow-sm rounded-lg space-y-3">
            {session?.user ? (
              <>
                <div className="text-sm">
                  <h3 className="font-bold mb-1">Nama</h3>
                  <p className="px-4 py-2 border rounded shadow-sm">
                    {session?.user.name}
                  </p>
                </div>
                <div className="text-sm">
                  <h3 className="font-bold mb-1">Email</h3>
                  <p className="px-4 py-2 border rounded shadow-sm">
                    {session?.user.email}
                  </p>
                </div>
              </>
            ) : (
              <FormDetailPemesananSkeleton />
            )}
          </div>
          <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full container py-3 bg-white shadow-sm lg:max-w-2xl border text-muted-foreground ">
            {discountMember > 0 && (
              <p className="text-xs">
                Diskon Member:{" "}
                <span className="text-primary">{discountMember}</span>
              </p>
            )}
            {discountVoucher > 0 && (
              <p className="text-xs">
                Diskon Voucher:{" "}
                <span className="text-primary">{discountVoucher}</span>
              </p>
            )}
            <div className="flex flex-wrap justify-between items-center mb-3">
              <div className="text-sm flex gap-x-1">
                Total:{" "}
                {session?.user.memberUser && voucher ? (
                  <div className="space-x-2 flex items-center">
                    <p className="line-through">{rupiahFormatter(total)}</p>
                    <p className="text-primary">
                      {rupiahFormatter(
                        total - discountVoucher - discountMember
                      )}
                    </p>
                  </div>
                ) : voucher ? (
                  <div className="space-x-2 flex items-center">
                    <p className="line-through">{rupiahFormatter(total)}</p>
                    <p className="text-primary">
                      {rupiahFormatter(total - discountVoucher)}
                    </p>
                  </div>
                ) : session?.user.memberUser ? (
                  <div className="space-x-2 flex items-center">
                    <p className="line-through">{rupiahFormatter(total)}</p>
                    <p className="text-primary">
                      {rupiahFormatter(total - discountMember)}
                    </p>
                  </div>
                ) : (
                  rupiahFormatter(total)
                )}
              </div>
              <DetailOrderDialog
                {...detailOrderInformation}
                date={form.watch("date")}
              />
            </div>
            <Button
              type="submit"
              variant={"primary"}
              disabled={!activeTicket?.id || isLoading}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Circle size={20} className="animate-pulse" /> Loading...
                </>
              ) : (
                <>
                  Pilih Pembayaran
                  <ArrowCircleRight size={20} />
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FormClaimVoucher(FormOrderTicket);
