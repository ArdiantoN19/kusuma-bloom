"use client";

import {
  At,
  Circle,
  GenderFemale,
  GenderMale,
  IdentificationBadge,
  MapPin,
  Pencil,
  Star,
} from "@phosphor-icons/react";
import { Button } from "../ui/button";
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
import React, { useCallback, useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { GENDER } from "@/lib/actions/userAction/Validator";
import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { updateUserByIdAction } from "@/lib/actions/userAction";
import { PayloadBodyUser } from "@/types/userAction";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";

interface FormEditProfileProps {
  user: {
    name: string;
    email: string;
    role: string;
    gender: string;
    address: string;
    userId: string;
  };
  sessionUpdate: (session: any) => void;
}

const FormEditProfileSchema = z.object({
  email: z.string().email({ message: "Email tidak valid" }),
  password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z]).{8,}$/, {
    message:
      "Password harus terdiri dari huruf kecil, huruf besar dan minimal 8 karakter",
  }),
  address: z.string().optional(),
});

const FormEditProfile: React.FC<FormEditProfileProps> = ({
  user,
  sessionUpdate,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const form = useForm<z.infer<typeof FormEditProfileSchema>>({
    resolver: zodResolver(FormEditProfileSchema),
    defaultValues: {
      email: user?.email,
      password: "",
      address: "",
    },
  });

  useEffect(() => {
    if (user?.email || user?.address) {
      form.setValue("email", user.email);
      form.setValue("address", user.address);
    }
  }, [form, user?.email, user?.address]);

  const onFormReset = useCallback(
    (data: { email: string; address: string }) => {
      form.reset({
        ...data,
        password: "",
      });
    },
    [form]
  );

  const onSubmitHandler = useCallback(
    async (data: z.infer<typeof FormEditProfileSchema>) => {
      setIsLoading(true);
      const response = await updateUserByIdAction(
        user?.userId as string,
        data as PayloadBodyUser
      );
      if (response.status !== "success") {
        toast.error(response.message);
      } else {
        toast.success("Info profile berhasil diubah");
        setOpenDialog((prev) => !prev);
        onFormReset({ email: data.email, address: data.address ?? "" });
        sessionUpdate({
          info: {
            email: data.email,
            address: data.address,
          },
        });
      }
      setIsLoading(false);
    },
    [onFormReset, sessionUpdate, user?.userId]
  );

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <div className="border rounded-lg p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold">Personal info</h3>
          <DialogTrigger asChild>
            <Button variant={"primary"}>
              <Pencil size={16} />
              Edit
            </Button>
          </DialogTrigger>
        </div>

        <div className="flex flex-col gap-y-4 md:grid md:grid-cols-3 lg:grid-cols-5">
          <div className="text-muted-foreground">
            <h4 className="text-sm font-bold flex gap-1 items-center mb-1">
              <IdentificationBadge size={16} /> Username
            </h4>
            <p className="text-sm">{user?.name}</p>
          </div>
          <div className="text-muted-foreground">
            <h4 className="text-sm font-bold flex gap-1 items-center mb-1">
              <At size={16} /> Email
            </h4>
            <p className="text-sm">{user?.email}</p>
          </div>
          <div className="text-muted-foreground">
            <h4 className="text-sm font-bold flex gap-1 items-center mb-1">
              <Star size={16} /> Role
            </h4>
            <Badge className="text-sm font-normal hover:bg-primary">
              {user?.role}
            </Badge>
          </div>
          <div className="text-muted-foreground">
            <h4 className="text-sm font-bold flex gap-1 items-center mb-1">
              {user?.gender === GENDER.MALE ? (
                <GenderMale size={16} />
              ) : (
                <GenderFemale size={16} />
              )}{" "}
              Jenis Kelamin
            </h4>
            <p className="text-sm">
              {user?.gender === GENDER.MALE ? "Laki-laki" : "Perempuan"}
            </p>
          </div>
          <div className="text-muted-foreground">
            <h4 className="text-sm font-bold flex gap-1 items-center mb-1">
              <MapPin size={16} /> Alamat
            </h4>
            <p className="text-sm">{user?.address || "-"}</p>
          </div>
        </div>
        <DialogContent className="bg-white max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-1">
              <Pencil size={20} />
              Edit profile
            </DialogTitle>
            <DialogDescription>
              Anda bisa mengubah profile disini.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              className="space-y-4"
              onSubmit={form.handleSubmit(onSubmitHandler)}
            >
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="address"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alamat</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Masukkan alamat"
                        className="resize-none h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Kami akan menyimpan alamat Anda dengan aman
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-2 justify-end">
                <Button
                  variant={"primary"}
                  className="bg-muted-foreground hover:bg-muted-foreground"
                  onClick={() => onFormReset({ email: "", address: "" })}
                  type="button"
                >
                  Clear
                </Button>
                <Button type="submit" variant={"primary"} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Circle size={20} className="animate-pulse" /> Loading...
                    </>
                  ) : (
                    <>Submit</>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default FormEditProfile;
