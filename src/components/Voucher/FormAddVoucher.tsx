"use client";

import React, { FunctionComponent, useCallback, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Check, Circle, Eraser, Percent, Plus } from "@phosphor-icons/react";
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
} from "../ui/form";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { PayloadBodyVoucher } from "@/types/voucherAction";
import { Checkbox } from "../ui/checkbox";
import { addVoucherAction } from "@/lib/actions/voucherAction";

const FormAddVoucher: FunctionComponent = () => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof FormVoucherSchema>>({
    resolver: zodResolver(FormVoucherSchema),
    defaultValues: {
      name: "",
      total: "",
      discount: "",
      status: false,
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
    const response = await addVoucherAction(payload);

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
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button variant={"primary"}>
          <Plus size={20} />
          <span className="text-xs md:text-sm">Tambah Voucher</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md bg-white max-h-[90dvh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-1">
            <Percent size={20} />
            Tambah Voucher
          </DialogTitle>
          <DialogDescription>
            Anda bisa menambahkan voucher disini.
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
      </DialogContent>
    </Dialog>
  );
};

export default FormAddVoucher;
