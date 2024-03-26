import { GENDER } from "@/lib/actions/userAction/Validator";
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
  gender: z.enum([GENDER.MALE, GENDER.FEMALE]),
  address: z.string().optional().nullable(),
  created_at: z.date(),
  updated_at: z.date(),
  memberUsers: z
    .object({
      userId: z.string(),
      image: z.string(),
      verifiedAt: z.date().nullish(),
    })
    .nullish(),
});
