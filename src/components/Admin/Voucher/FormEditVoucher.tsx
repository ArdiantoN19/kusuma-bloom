"use client";

import React, { FunctionComponent, useCallback, useState } from "react";
import { DialogDescription, DialogHeader, DialogTitle } from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Check, Circle, Eraser, Percent } from "@phosphor-icons/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { FormVoucherSchema } from "@/lib/actions/voucherAction/Validator";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { PayloadBodyVoucher, ResponseVoucher } from "@/types/voucherAction";
import { Checkbox } from "../../ui/checkbox";
import { updateVoucherByIdAction } from "@/lib/actions/voucherAction";

interface FormEditVoucherProps {
  voucher: ResponseVoucher;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormEditVoucher: FunctionComponent<FormEditVoucherProps> = ({
  voucher,
  setOpenDialog,
}) => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof FormVoucherSchema>>({
    resolver: zodResolver(FormVoucherSchema),
    defaultValues: {
      name: voucher.name,
      total: String(voucher.total),
      discount: String(voucher.discount * 100),
      status: voucher.status,
    },
  });

  const onFormReset = useCallback(() => {
    form.reset({
      name: "",
      total: "",
      discount: "",
      status: false,
    });
  }, [form]);

  const onSubmitHandler = async (data: z.infer<typeof FormVoucherSchema>) => {
    const payload: PayloadBodyVoucher = {
      ...data,
      total: Number(data.total),
      discount: Number(data.discount) / 100,
      userId: session?.user.userId,
    };

    setIsLoading(true);
    const response = await updateVoucherByIdAction(voucher.id, payload);

    if (response.status !== "success") {
      toast.error(response.message);
    } else {
      toast.success(response.message);
      setOpenDialog((prev) => !prev);
      onFormReset();
      router.refresh();
    }
    setIsLoading(false);
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-1">
          <Percent size={20} />
          Edit Voucher
        </DialogTitle>
        <DialogDescription className="text-start">
          Anda bisa mengubah voucher disini.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit(onSubmitHandler)}
        >
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Voucher</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="total"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total</FormLabel>
                <FormControl>
                  <Input {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="discount"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Diskon</FormLabel>
                <FormControl>
                  <Input {...field} type="number" />
                </FormControl>
                <FormDescription>
                  *Tulis dengan format bilangan bulat. Contoh angka 10, untuk
                  10%, dst
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="status"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex items-center gap-2 ">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="mb-1">
                  <FormLabel>Status</FormLabel>
                  <FormDescription>
                    Jika checked maka status voucher akan aktif
                  </FormDescription>
                </div>
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

export default FormEditVoucher;
