"use client";

import React, { useCallback, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Check, Circle, Eraser, Rocket } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormJoinMemberUserSchema } from "@/lib/actions/memberUserAction/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import Image from "next/image";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { uploadImageCloudinary } from "@/lib/cloudinary";
import {
  addMemberUserAction,
  getMemberUserByIdAction,
} from "@/lib/actions/memberUserAction";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const FormJoinMember = () => {
  const { data: session, update: sessionUpdate } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const form = useForm<z.infer<typeof FormJoinMemberUserSchema>>({
    resolver: zodResolver(FormJoinMemberUserSchema),
    defaultValues: {
      image: undefined,
    },
  });
  const [imageUrl, setImageUrl] = useState<string>("");
  const imageRef = form.register("image");

  const onImagePreviewHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
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
    },
    [form]
  );

  const onSubmitHandler = useCallback(
    async (data: z.infer<typeof FormJoinMemberUserSchema>) => {
      setIsLoading(true);
      const secure_url = await uploadImageCloudinary(
        data.image as FileList,
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET_FACILITY as string
      );
      const payload = {
        image: secure_url,
        userId: session?.user.userId,
      };
      const response = await addMemberUserAction(payload);
      if (response.status !== "success") {
        toast.error(response.message);
      } else {
        sessionUpdate({
          info: {
            statusMember: "pending",
          },
        });
        toast.success(response.message);
        setOpenDialog((prev) => !prev);
        form.reset({ image: undefined });
        setImageUrl("");
      }
      setIsLoading(false);
    },
    [session, form, sessionUpdate]
  );

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <button
          className="absolute top-3 right-3 text-xs border px-2 py-1 border-primary text-primary rounded"
          title=""
        >
          <div className="size-2 absolute -top-1 -right-1 animate-ping rounded-full bg-primary"></div>
          Join member
        </button>
      </DialogTrigger>
      <DialogContent className="bg-white max-w-[350px] md:min-w-[350px] md:max-w-md rounded">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-1">
            <Rocket size={20} />
            Join Member Kusuma Bloom
          </DialogTitle>
          <DialogDescription>
            Isikan field yang dibutuhkan untuk bergabung menjadi member kami
          </DialogDescription>
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
                  <FormLabel>Gambar</FormLabel>
                  <FormControl>
                    <div className="w-full h-[150px] border rounded shadow-sm relative overflow-hidden">
                      <p className="text-xs text-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        Pilih gambar
                      </p>
                      <Input
                        {...imageRef}
                        type="file"
                        accept="image/*"
                        className="opacity-0 w-full h-full absolute z-[10] cursor-pointer"
                        onChange={onImagePreviewHandler}
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
                              form.reset({ image: undefined });
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
            <div className="flex justify-end items-center gap-2 pt-8">
              <Button
                type="reset"
                variant={"primary"}
                className="bg-muted-foreground hover:bg-muted-foreground"
                onClick={() => {
                  form.reset({ image: undefined });
                  setImageUrl("");
                }}
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

export default FormJoinMember;
