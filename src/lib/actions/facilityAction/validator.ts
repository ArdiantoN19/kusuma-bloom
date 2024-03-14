import { z } from "zod";

export const FormFacilitySchema = z.object({
  name: z.string().min(3, { message: "Nama minimal 3 karakter" }),
  description: z.string().min(3, { message: "Deskripsi minimal 3 karakter" }),
  image: z.custom<FileList>().optional(),
  category_age: z.string().min(1, { message: "Kategori umur harus diisi" }),
  capacities: z.string().min(1, { message: "Kapasitas harus diisi" }),
});
