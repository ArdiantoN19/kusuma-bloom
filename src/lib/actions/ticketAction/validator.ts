import { z } from "zod";

const FormTicketSchema = z.object({
  name: z
    .string({
      required_error: "Nama harus diisi",
    })
    .min(3, { message: "Nama minimal 3 karakter" }),
  quantity: z
    .string({
      required_error: "Kuantiti harus diisi",
    })
    .min(1, { message: "Kuantiti harus lebih dari 1" }),
  price: z
    .string({
      required_error: "Harga harus diisi",
    })
    .min(1, { message: "Kuantiti harus lebih dari 1" }),
  status: z.boolean({
    required_error: "Status harus diisi",
  }),
  date: z
    .object(
      {
        from: z.date().optional(),
        to: z.date().optional(),
      },
      { required_error: "Tanggal harus diisi" }
    )
    .refine((date) => !!date.from && !!date.to, {
      // check if both from and to are not undefined
      message: "Tanggal harus diisi",
    }),
});

export const validator = {
  FormTicketSchema,
};
