"use client";

import React, { useCallback, useReducer, useState } from "react";
import { getVoucherByNameAction } from "@/lib/actions/voucherAction";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Confetti } from "@phosphor-icons/react";
import { ResponseTicket } from "@/types/ticketAction";
import { ResponseVoucher } from "@/types/voucherAction";
import { useSession } from "next-auth/react";
const FormClaimVoucherSchema = z.object({
  voucher: z
    .string({ required_error: "Kode voucher harus diisi" })
    .min(1, { message: "Kode voucher harus diisi" }),
});

interface FormOrderTicketProps {
  activeTicket: ResponseTicket | null;
}

const FormClaimVoucher = (
  Component: React.FC<FormOrderTicketProps & { voucher: ResponseVoucher }>
) => {
  return function FormOrderTicket({ activeTicket }: FormOrderTicketProps) {
    const { data: session } = useSession();
    const [voucher, setVoucher] = useState<ResponseVoucher>();
    const form = useForm<z.infer<typeof FormClaimVoucherSchema>>({
      resolver: zodResolver(FormClaimVoucherSchema),
      defaultValues: {
        voucher: "",
      },
    });

    const onCheckAvailableVoucher = useCallback(async () => {
      const response = await getVoucherByNameAction({
        name: form.watch("voucher"),
        userId: session?.user.userId,
      });
      if (response.status !== "success") {
        toast.error(response.message);
        return;
      }
      toast.success(response.message);
      setVoucher(response?.data);
    }, [form, session]);

    return (
      <>
        <Component activeTicket={activeTicket} voucher={voucher!} />
        <div className="p-4 bg-white border shadow-sm rounded-lg mt-5 mb-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onCheckAvailableVoucher)}>
              <FormField
                name="voucher"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kode Voucher</FormLabel>
                    <div className="grid grid-cols-4 gap-x-2">
                      <FormControl className="col-span-3">
                        <Input {...field} />
                      </FormControl>
                      <Button
                        type="submit"
                        variant={"primary"}
                        className="col-span-1"
                      >
                        Klaim
                        <Confetti size={20} />
                      </Button>
                    </div>
                    <FormMessage />
                    <FormDescription>
                      Masukkan kode voucher aktif untuk mendapatkan potongan
                      harga. Voucher dapat ditemukan pada halaman{" "}
                      <Link
                        href={"/user/voucher"}
                        className="underline text-primary"
                      >
                        voucher
                      </Link>
                    </FormDescription>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
      </>
    );
  };
};

export default FormClaimVoucher;
