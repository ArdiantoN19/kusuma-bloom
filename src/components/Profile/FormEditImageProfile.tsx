"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { Circle, Pen, Upload } from "@phosphor-icons/react";
import { uploadImageCloudinary } from "@/lib/cloudinary";
import { updateImageUserByIdAction } from "@/lib/actions/userAction";

interface FormEditImageProfileProps extends React.HTMLAttributes<HTMLElement> {
  user: {
    image: string;
    userId: string;
    name: string;
  };
  sessionUpdate: (session: any) => void;
}

const FormImageProfileSchema = z.object({
  image: z
    .custom<FileList | undefined>()
    .refine(
      (fileList) => fileList?.length === 1,
      "Harap pilih salah satu gambar"
    ),
});

const FormEditImageProfile: React.FC<FormEditImageProfileProps> = ({
  user,
  sessionUpdate,
  className,
  ...props
}) => {
  const form = useForm<z.infer<typeof FormImageProfileSchema>>({
    resolver: zodResolver(FormImageProfileSchema),
  });
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setImageUrl(user?.image as string);
    if (form.formState.errors.image) {
      toast.error(form.formState.errors.image?.message);
    }
  }, [user, form.formState.errors.image]);

  const imageRef = form.register("image");
  const onImageChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file?.size >= 3000000) {
        toast.error("Ukuran file harus lebih kecil dari 3 MB");
        form.setValue("image", undefined);
        setImageUrl(user?.image as string);
        return;
      }
      if (!file?.type.startsWith("image/")) {
        toast.error("File harus berekstensi .jpg, .jpeg, .png, and .webp");
        form.setValue("image", undefined);
        setImageUrl(user?.image as string);
        return;
      }

      setImageUrl(URL.createObjectURL(file));
      return;
    }
  };

  const onSubmitHandler = useCallback(
    async (data: z.infer<typeof FormImageProfileSchema>) => {
      if (data.image) {
        setIsLoading(true);
        const secure_url = await uploadImageCloudinary(
          data.image as FileList,
          process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string
        );
        await updateImageUserByIdAction(user?.userId, secure_url);
        sessionUpdate({
          info: {
            image: secure_url,
          },
        });
        toast.success("Foto profil berhasil diubah");
        form.setValue("image", undefined);
        setIsLoading(false);
      }
    },
    [form, sessionUpdate, user?.userId]
  );

  return (
    <div className={className} {...props}>
      <Form {...form}>
        <form
          className="w-full flex gap-6 items-center flex-col md:flex-row"
          onSubmit={form.handleSubmit(onSubmitHandler)}
        >
          <FormField
            name="image"
            control={form.control}
            render={({ field }) => (
              <FormItem className="rounded-full size-36 shrink border relative">
                <Avatar className="size-full text-xl">
                  <AvatarImage src={imageUrl} />
                  <AvatarFallback>{user?.name?.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <FormControl>
                  <Input
                    {...imageRef}
                    type="file"
                    onChange={(e) => onImageChangeHandler(e)}
                    className="absolute bottom-0 right-0 size-5  cursor-pointer opacity-0"
                  />
                </FormControl>
                <FormLabel className="absolute bottom-0 right-3 size-8 bg-primary rounded-full border cursor-pointer grid place-items-center">
                  <Pen size={16} className="text-white" />
                </FormLabel>
              </FormItem>
            )}
          />
          <div className="flex-1 flex flex-col-reverse md:block gap-y-2">
            <Button
              disabled={isLoading}
              variant={"primary"}
              className="mb-3"
              type="submit"
            >
              {isLoading ? (
                <>
                  <Circle size={20} className="animate-pulse" /> Loading...
                </>
              ) : (
                <>
                  <Upload size={20} /> Upload Foto
                </>
              )}
            </Button>
            <div className="text-xs md:text-sm text-muted-foreground">
              <p>Rekomendasi gambar ukuran 800x800 px</p>
              <p>File berekstensi .jpg, .jpeg, .png, dan .webp</p>
              <p>Ukuran maksimal 3 MB</p>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FormEditImageProfile;
