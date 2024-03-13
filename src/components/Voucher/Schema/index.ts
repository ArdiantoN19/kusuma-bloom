import { z } from "zod";

export const VoucherSchema = z.object({
  id: z.string(),
  name: z.string(),
  total: z.number(),
  discount: z.number(),
  status: z.boolean(),
  userId: z.string(),
  user: z.object({
    name: z.string(),
    image: z.string(),
  }),
  created_at: z.date(),
  updated_at: z.date(),
});
