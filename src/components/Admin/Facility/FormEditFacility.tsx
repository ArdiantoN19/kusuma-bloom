"use client";

import { FormFacilitySchema } from "@/lib/actions/facilityAction/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { FunctionComponent, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DialogDescription, DialogHeader, DialogTitle } from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Check, Circle, Eraser, House, Plus } from "@phosphor-icons/react";
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
import Image from "next/image";
import { toast } from "sonner";
import { Textarea } from "../../ui/textarea";
import { PayloadBodyFacility, ResponseFacility } from "@/types/facilityAction";
import { useSession } from "next-auth/react";
import {
  addFacilityAction,
  updateFacilityByIdAction,
  updateImageFacilityByIdAction,
} from "@/lib/actions/facilityAction";
import {
  deleteImageFromCloudinary,
  getPublicIdFromUrl,
  uploadImageCloudinary,
} from "@/lib/cloudinary";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { capacities, category_ages } from "./Table/ColumnFilter";
import Link from "next/link";

interface FormEditFacilityProps {
  facility: ResponseFacility;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormEditFacility: FunctionComponent<FormEditFacilityProps> = ({
  facility,
  setOpenDialog,
}) => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>(facility.image);
  const router = useRouter();

  const form = useForm<z.infer<typeof FormFacilitySchema>>({
    resolver: zodResolver(FormFacilitySchema),
    defaultValues: {
      name: facility.name,
      description: facility.description,
      image: undefined,
      category_age: facility.category_age,
      capacities: facility.capacities,
    },
  });

  const onFormReset = useCallback(() => {
    form.reset({
      name: "",
      description: "",
      image: undefined,
      category_age: "",
      capacities: "",
    });
    setImageUrl("");
  }, [form]);

  const imageRef = form.register("image");

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file?.size >= 5000000) {
        toast.error("Ukuran file harus lebih kecil dari 5 MB");
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
    }
  };

  const onSubmitHandler = useCallback(
    async (data: z.infer<typeof FormFacilitySchema>) => {
      const payload: PayloadBodyFacility = {
        ...data,
        image: !imageUrl
          ? `https://res.cloudinary.com/dgzdcgqfz/image/upload/v1711441905/Screenshot_2024-03-26_153028_hlat2p.png`
          : facility.image,
        userId: session?.user.userId,
      };
      setIsLoading(true);
      const response = await updateFacilityByIdAction(facility.id, payload);

      if (response.status !== "success") {
        toast.error(response.message);
      } else {
        if (data.image?.length) {
          if (!facility.image.includes("api.dicebear.com")) {
            const publicId = getPublicIdFromUrl(facility.image as string);
            await deleteImageFromCloudinary(publicId);
          }
          const secure_url = await uploadImageCloudinary(
            data.image as FileList,
            process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET_FACILITY as string
          );
          await updateImageFacilityByIdAction(response.data.id, secure_url);
        }
        toast.success(response.message);
        setOpenDialog((prev) => !prev);
        onFormReset();
        router.refresh();
      }

      setIsLoading(false);
    },
    [
      facility.id,
      facility.image,
      imageUrl,
      onFormReset,
      router,
      session?.user.userId,
      setOpenDialog,
    ]
  );

  return (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-1">
          <House size={20} />
          Edit Fasilitas
        </DialogTitle>
        <DialogDescription className="text-start">
          Anda bisa mengubah fasilitas disini.
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
                <FormLabel>Nama</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="category_age"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kategory Umur</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="--Pilih Kategory Umur--" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {category_ages.map((category_age) => (
                      <SelectItem
                        key={category_age.value}
                        value={category_age.value}
                      >
                        {category_age.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="capacities"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kapasitas</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="--Pilih Kapasitas--" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {capacities.map((capacity) => (
                      <SelectItem key={capacity.value} value={capacity.value}>
                        {capacity.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deskripsi</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Deskripsi Fasilitas"
                    className="resize-none h-[200px]"
                  />
                </FormControl>
                <div className="text-xs text-muted-foreground">
                  Perhatian, harap gunakan markdown syntax.{" "}
                  <Link
                    href={"https://www.markdownguide.org/basic-syntax/"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-primary"
                  >
                    Lihat referensi
                  </Link>
                </div>
                <FormDescription>
                  Harap deskripsikan dengan jelas mengenai fasilitas tersebut.
                </FormDescription>
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

export default FormEditFacility;
