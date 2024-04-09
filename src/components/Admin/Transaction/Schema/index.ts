import { TRANSACTION_STATUS } from "@/types/transactionAction";
import { z } from "zod";

export const TransactionSchema = z.object({
  id: z.string(),
  quantity: z.number(),
  price: z.number(),
  gross_amount: z.number(),
  status: z.enum([
    TRANSACTION_STATUS.FAILURE,
    TRANSACTION_STATUS.PENDING,
    TRANSACTION_STATUS.SUCCESS,
  ]),
  snap_token: z.string(),
  payment_type: z.string().nullable(),
  expired: z.date(),
  userId: z.string(),
  user: z.object({
    name: z.string(),
    image: z.string().optional(),
  }),
  ticketId: z.string(),
  memberUserId: z.string().nullable(),
  memberUser: z
    .object({
      discount: z.number(),
    })
    .nullable(),
  voucherId: z.string().nullable(),
  voucher: z
    .object({
      discount: z.number(),
    })
    .nullable(),
  scanTickets: z
    .object({
      status: z.boolean(),
    })
    .nullable(),
  created_at: z.date(),
  updated_at: z.date(),
});
