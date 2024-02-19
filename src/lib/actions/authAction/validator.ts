import { PayloadRegisterType } from "@/types/authAction";
import { z } from "zod";

const PayloadRegisterSchema = z.object({
  username: z.string().min(3, { message: "Username minimal 3 karakter" }),
  email: z.string().email({ message: "Email tidak valid" }),
  password: z
    .string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z]).{8,}$/, {
      message:
        "Password harus terdiri dari huruf kecil, huruf besar dan minimal 8 karakter",
    }),
});

const RegisterValidator = (data: PayloadRegisterType) => {
  const validationField = PayloadRegisterSchema.safeParse(data);
  return validationField;
};

export const AuthValidator = {
  RegisterValidator,
};
