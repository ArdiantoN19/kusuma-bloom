"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { Button } from "../ui/button";
import ButtonResendEmail from "./ButtonResendEmail";
import { useRouter, useSearchParams } from "next/navigation";
import {
  getUserByEmail,
  verifyUserTokenAction,
} from "@/lib/actions/authAction";
import { toast } from "sonner";
import { Check, Circle } from "@phosphor-icons/react";

const FormVerifySchema = z.object({
  otp: z.string().min(6, { message: "OTP harus berisi 6 karakter" }),
});

const FormVerifyEmailOTP: React.FC = () => {
  const params = useSearchParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof FormVerifySchema>>({
    resolver: zodResolver(FormVerifySchema),
    defaultValues: {
      otp: "",
    },
  });

  const searchParams = useMemo(() => {
    return {
      email: params.get("email"),
      verification_send: Boolean(params.get("verification_send")),
      token: params.get("token"),
    };
  }, [params]);

  useEffect(() => {
    if (searchParams.token && searchParams.token.length !== 70) {
      router.push("/");
      return;
    }
    if (searchParams.email) {
      (async () => {
        const user = await getUserByEmail(searchParams.email as string);
        if (user?.emailVerified) {
          router.push("/");
        }
      })();
    }
  }, [searchParams.token, searchParams.email, router]);

  const onSubmitHandler = useCallback(
    async (data: z.infer<typeof FormVerifySchema>) => {
      const payload = {
        identifier: searchParams.email as string,
        token: data.otp as string,
      };
      setIsLoading(true);
      const response = await verifyUserTokenAction(payload);
      if (response?.status === "fail") {
        toast.error(response?.message);
      }
      setIsLoading(false);
    },
    [searchParams.email]
  );

  if (searchParams.token?.length !== 70) {
    return null;
  }

  return (
    <div>
      <p className="text-primary text-sm mb-3">
        Kode OTP telah dikirimkan ke email <strong>{searchParams.email}</strong>
      </p>
      <Form {...form}>
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit(onSubmitHandler)}
        >
          <FormField
            name="otp"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>OTP</FormLabel>
                <FormControl>
                  <InputOTP
                    maxLength={6}
                    render={({ slots }) => (
                      <InputOTPGroup>
                        {slots.map((slot, index) => (
                          <InputOTPSlot key={index} {...slot} />
                        ))}{" "}
                      </InputOTPGroup>
                    )}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-1 flex-wrap text-muted-foreground text-sm items-center">
            Kirim ulang kode dalam{" "}
            {!!searchParams.verification_send && (
              <ButtonResendEmail data={searchParams} />
            )}
          </div>
          <Button type="submit" variant={"primary"} disabled={isLoading}>
            {isLoading ? (
              <>
                <Circle size={20} className="animate-pulse" /> Loading...
              </>
            ) : (
              <>
                <Check size={20} /> Verifikasi
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default FormVerifyEmailOTP;
