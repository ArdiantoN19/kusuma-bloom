"use server";

import crypto from "crypto";
import bcryptPasswordHash from "@/utils/bcryptPasswordHash";
import { authService } from "./AuthService";
import { AuthValidator } from "./validator";
import { PayloadRegisterType } from "@/types/authAction";
import { redirect } from "next/navigation";
import { verifyTokenService } from "./VerifyTokenService";
import { PayloadSendMailType } from "@/types/resend";
import { nodemailerEmailService } from "@/lib/nodemailer";
import { createQueryString, generateExpiredTime } from "@/utils";

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

  const payloadVerifyToken = {
    identifier: data.email,
    token: generateRandomTokenOTP(),
  };

  try {
    await authService.checkAvailableEmail(data.email);
    data.password = await bcryptPasswordHash.hash(data.password);
    await authService.register(data);

    await verifyTokenService.addVerifyToken(payloadVerifyToken);
    await sendVerificationEmail(
      payloadVerifyToken.identifier,
      payloadVerifyToken.token
    );
  } catch (error: any) {
    if ("code" in error) {
      return { message: "Terjadi kesalahan, user gagal terdaftar" };
    }
    return { message: error.message };
  }

  const url = new URL("/verify/email/send", process.env.NEXT_PUBLIC_BASE_URL);
  url.searchParams.set("email", data.email);
  url.searchParams.set("verification_send", "1");
  url.searchParams.set(
    "token",
    `${hashedTokenOTP(payloadVerifyToken.token)}${payloadVerifyToken.token}`
  );
  url.searchParams.set("expired", generateExpiredTime(120).toString());

  redirect(url.toString());
};

export const getUserByEmail = async (email: string) => {
  try {
    const user = await authService.getUserByEmail(email);
    return user;
  } catch (error) {
    console.error(error);
  }
};

export const verifyUserTokenAction = async (data: {
  identifier: string;
  token: string;
}) => {
  try {
    const { email, expires } = await verifyTokenService.verifyToken(data);
    if (expires < new Date()) {
      throw new Error("Token expired, klik kirim ulang otp");
    }
    await authService.updateEmailVerified(email);
    await verifyTokenService.deleteToken(data);
  } catch (error: any) {
    if ("code" in error) {
      return {
        status: "fail",
        message: "Terjadi kesalahan, token otp gagal diverifikasi",
      };
    }
    return { status: "fail", message: error.message };
  }

  const url = new URL("/verify/email", process.env.NEXT_PUBLIC_BASE_URL);
  url.searchParams.set("status", "1");
  url.searchParams.set("signature", process.env.BASE_SIGNATURE_APP as string);

  redirect(url.toString());
};

export const resendVerificationTokenAction = async (data: {
  identifier: string;
  token: string;
}) => {
  const newToken = generateRandomTokenOTP();
  try {
    data.token = decodeTokenOTP(data.token);
    const { email, token } = await verifyTokenService.verifyToken(data);

    const payload = {
      identifier: email,
      oldToken: token,
      newToken,
    };

    await verifyTokenService.updateToken(payload);
    await sendVerificationEmail(email, newToken);
  } catch (error: any) {
    if ("code" in error) {
      return {
        status: "fail",
        message: "Terjadi kesalahan, kirim ulang token gagal dilakukan",
      };
    }
    return { status: "fail", message: error.message };
  }

  const url = new URL("/verify/email/send", process.env.NEXT_PUBLIC_BASE_URL);
  url.searchParams.set("email", data.identifier);
  url.searchParams.set("verification_send", "1");
  url.searchParams.set("token", `${hashedTokenOTP(newToken)}${newToken}`);
  url.searchParams.set("expired", generateExpiredTime(120).toString());

  redirect(url.toString());
};

export const generateRandomTokenOTP = (): string => {
  const token = Math.floor(Math.random() * 900000 + 100000);
  return String(token).padStart(6, "0");
};

const generateTemplateHTML = (token: string, email: string) => {
  const url = createQueryString("/verify/email/send", [
    { key: "email", value: email },
    { key: "verification_send", value: "1" },
    { key: "token", value: `${hashedTokenOTP(token)}${token}` },
  ]);
  return `
  <div style="padding: 2em; text-align: left;background: #f5f5f5">
  <div class="our-class" style="display:flex; align-items:center; margin-bottom: 3em; gap: 30px">
    <img src='https://res.cloudinary.com/dgzdcgqfz/image/upload/v1710595223/logo-telaga-kusuma_cqylrt.png' style="width:50px; height:50px; object-fit:cover;" alt="logo-kusuma-bloom"/>
    <h3>KUSUMA BLOOM</h3>
  </div>
  <h2>VERIFIKASI EMAIL KAMU</h2>
  <div style="margin-bottom: 1em">
    <div>Dibawah ini merupakan kode OTP
    <small style="display:block;">Jangan bagikan kode ini pada siapapun!</small>
    </div>
  </div>
  <h2 style="margin-bottom: 1em">${token}</h2>
  <a href="${url}" target="_blank" rel="noopener noreferrer" style="display:block; text-align:center; width: 170px; padding: 15px; background-color: #00bd71; color: white; text-decoration: none; border-radius: 5px; margin-bottom: 1rem;">Verify Now</a>
  <div style="margin-bottom:2em">Jika kamu butuh bantuan harap hubungi pihak kami
    <a href="https://mail.google.com/mail/?view=cm&fs=1&to=kusumabloomofficial@example.com&su=verification-email&body=ineedhelp&bcc=kusumabloomofficial.else@example.com">disini</a>
  </div>
  <h4>- KUSUMA BLOOM SECURITY</h4>
</div>`;
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const payload: PayloadSendMailType = {
    to: email,
    subject: "Verify your email from KUSUMA BLOOM",
    html: generateTemplateHTML(token, email),
  };
  nodemailerEmailService.sendMail(payload);
};

export const hashedTokenOTP = (token: string) => {
  const hash = crypto.createHash("sha256").update(token).digest("hex");
  return hash;
};

const decodeTokenOTP = (token: string) => {
  const decode = token.slice(-6);
  return decode;
};
