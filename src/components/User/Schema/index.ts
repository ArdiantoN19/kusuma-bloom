import { ROLE } from "@/types/authAction";
import { z } from "zod";

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.date().nullable(),
  password: z.string(),
  image: z.string(),
  role: z.enum([ROLE.ADMIN, ROLE.REGULAR]),
  created_at: z.date(),
  updated_at: z.date(),
});
