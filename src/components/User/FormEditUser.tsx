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
import { Check, Circle, Eraser, Plus, User } from "@phosphor-icons/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { FormUserSchema } from "@/lib/actions/userAction/Validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { ROLE } from "@/types/authAction";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { PayloadBodyUser, ResponseUser } from "@/types/userAction";
import {
  updateImageUserByIdAction,
  updateUserByIdAction,
} from "@/lib/actions/userAction";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  deleteImageFromCloudinary,
  getPublicIdFromUrl,
  uploadImageCloudinary,
} from "@/lib/cloudinary";

interface FormEditUserProps {
  user: ResponseUser;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormEditUser: FunctionComponent<FormEditUserProps> = ({
  user,
  setOpenDialog,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string | undefined>(user.image);
  const form = useForm<z.infer<typeof FormUserSchema>>({
    resolver: zodResolver(FormUserSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      password: user.password,
      image: undefined,
      role: user.role,
    },
  });

  const imageRef = form.register("image");
  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file?.size >= 3000000) {
        toast.error("Ukuran file harus lebih kecil dari 3 MB");
        form.setValue("image", undefined);
        setImageUrl("");
        return;
      }
      if (!file?.type.startsWith("image/")) {
        toast.error("File harus berekstensi .jpg, .jpeg, .png, and .webp");
        form.setValue("image", undefined);
        setImageUrl("");
        return;
      }
      setImageUrl(URL.createObjectURL(file));

      return;
    }
  };

  const onFormReset = useCallback(() => {
    form.reset({
      name: "",
      email: "",
      password: "",
      image: undefined,
      role: ROLE.REGULAR,
    });
    setImageUrl("");
  }, [form]);

  const onSubmitHandler = useCallback(
    async (data: z.infer<typeof FormUserSchema>) => {
      const payload: PayloadBodyUser = {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
        image: !imageUrl
          ? `${process.env.NEXT_PUBLIC_API_AVATAR_URL}?seed=${user.name}`
          : user.image,
      };

      setIsLoading(true);
      const response = await updateUserByIdAction(user.id, payload);

      if (response.status !== "success") {
        toast.error(response.message);
      } else {
        if (data.image?.length) {
          if (!user.image.includes("api.dicebear.com")) {
            const publicId = getPublicIdFromUrl(user.image as string);
            await deleteImageFromCloudinary(publicId);
          }
          const secure_url = await uploadImageCloudinary(
            data.image as FileList
          );
          await updateImageUserByIdAction(response.data.id, secure_url);
        }
        toast.success(response.message);
        setOpenDialog((prev) => !prev);
        onFormReset();
        router.refresh();
      }
      setIsLoading(false);
    },
    [
      imageUrl,
      onFormReset,
      router,
      setOpenDialog,
      user.id,
      user.image,
      user.name,
    ]
  );

  return (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-1">
          <User size={20} />
          Edit User
        </DialogTitle>
        <DialogDescription>Anda bisa mengubah user disini.</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit(onSubmitHandler)}
        >
          <FormField
            name="image"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Foto</FormLabel>
                <FormControl>
                  <div className="size-[150px] border rounded shadow-sm relative overflow-hidden">
                    <p className="text-xs text-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                      Pilih gambar
                    </p>
                    <Input
                      {...imageRef}
                      type="file"
                      accept="image/*"
                      className="opacity-0 w-full h-full absolute z-[10]"
                      onChange={onImageChange}
                    />
                    {imageUrl && (
                      <>
                        <Image
                          src={imageUrl}
                          alt="preview image"
                          className="absolute w-full h-full top-0 left-0 object-cover "
                          width={200}
                          height={200}
                        />
                        <button
                          type="button"
                          className="rounded-full z-[10] bg-white size-5 text-xs absolute top-1 right-1 flex items-center justify-center"
                          onClick={() => {
                            form.resetField("image");
                            setImageUrl("");
                          }}
                        >
                          x
                        </button>
                      </>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
            name="role"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={"--pilih role--"} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={ROLE.REGULAR}>Regular</SelectItem>
                    <SelectItem value={ROLE.ADMIN}>Admin</SelectItem>
                  </SelectContent>
                </Select>
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

export default FormEditUser;
