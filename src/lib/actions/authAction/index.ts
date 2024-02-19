"use server";

import bcryptPasswordHash from "@/utils/bcryptPasswordHash";
import { authService } from "./AuthService";
import { AuthValidator } from "./validator";
import { PayloadRegisterType } from "@/types/authAction";
import { redirect } from "next/navigation";

export const userRegisterAction = async (
  prevState: any,
  formData: FormData
) => {
  const data = Object.fromEntries(formData.entries()) as PayloadRegisterType;
  const validation = AuthValidator.RegisterValidator(data);
  if (!validation.success) {
    return {
      Error: validation.error.flatten().fieldErrors,
    };
  }

  try {
    await authService.checkAvailableEmail(data.email);
    data.password = await bcryptPasswordHash.hash(data.password);
    await authService.register(data);
  } catch (error: any) {
    if ("code" in error) {
      return { message: "Terjadi kesalahan, user gagal terdaftar" };
    }
    return { message: error.message };
  }

  redirect("/login");
};
