import { z } from "zod";

export const TicketSchema = z.object({
  id: z.string(),
  name: z.string(),
  quantity: z.number(),
  price: z.number(),
  status: z.boolean(),
  fromDate: z.date(),
  toDate: z.date(),
  userId: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
  user: z.object({
    name: z.string(),
    image: z.string(),
  }),
});
