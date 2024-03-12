import { ROLE } from "@/types/authAction";
import { z } from "zod";

const MAX_FILE_SIZE = 3000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export enum GENDER {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export const FormUserSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Nama minimal harus terdiri dari 3 karakter" }),
  email: z.string().email({ message: "Email tidak valid" }),
  password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z]).{8,}$/, {
    message:
      "Password harus terdiri dari huruf kecil, huruf besar dan minimal 8 karakter",
  }),
  image: z.custom<FileList>().optional(),
  // image: z
  // .custom<FileList>()
  // .refine((fileList) => fileList.length === 1, "")
  // .transform((file) => file[0] as File)
  // .refine((file) => {
  //   return file.size <= MAX_FILE_SIZE;
  // }, `Ukuran file harus lebih kecil dari 3 MB.`)
  // .refine(
  //   (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
  //   "File harus berekstensi .jpg, .jpeg, .png, and .webp"
  // )
  // .optional(),
  role: z.enum([ROLE.ADMIN, ROLE.REGULAR], {
    required_error: "Role user harus diisi",
  }),
  gender: z.enum([GENDER.MALE, GENDER.FEMALE]),
  address: z.string().optional().nullable(),
});

// ! Refine in zod
/**
 const formSchema = z.object({
  password: z.string(),
  confirmPassword: z.string(),
 }).refine(( values ) => values.password === values.confirmPassword, {
  message: "Passwords do not match",
 })

 jadi method refine akan mengembalikan sebuah nilai untuk parameter pertama akna berisi sebuah kondisi yang akan mengembalikan sebuah boolean
 sedangkan parameter kedua adalah message
*/
