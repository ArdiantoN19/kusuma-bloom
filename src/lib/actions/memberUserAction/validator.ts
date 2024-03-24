import { z } from "zod";

const MAX_FILE_SIZE = 3000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const FormJoinMemberUserSchema = z.object({
  image: z
    .custom<FileList>()
    .refine((fileList) => fileList.length === 1, "Gambar harus diisi.")
    .optional(),
  // .transform((file) => file[0] as File)
  // .refine(
  //   (file) => file.size <= MAX_FILE_SIZE,
  //   "Gambar harus lebih kecil dari 3MB."
  // )
  // .refine(
  //   (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
  //   "Gambar harus berekstensi .jpg, .jpeg, .png, dan .webp"
  // )
});
