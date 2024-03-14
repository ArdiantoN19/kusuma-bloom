import { z } from "zod";

export const FacilitySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  image: z.string(),
  category_age: z.string(),
  capacities: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
  userId: z.string(),
  user: z.object({
    name: z.string(),
    image: z.string(),
  }),
});
