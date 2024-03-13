import { z } from "zod";

export const FormVoucherSchema = z.object({
  name: z.string().min(3, { message: "Nama voucher minimal 3 karakter" }),
  total: z
    .string({ required_error: "Total voucher harus diisi" })
    .refine((value) => Number(value) > 0, {
      message: "Kuantiti voucher harus lebih dari 0 atau harus positif",
    }),
  discount: z
    .string({ required_error: "Diskon voucher harus diisi" })
    .refine((value) => Number(value) > 0, {
      message: "Diskon voucher harus lebih dari 0 atau harus positif",
    }),
  status: z.boolean().optional(),
});
