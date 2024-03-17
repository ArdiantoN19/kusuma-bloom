"use client";

import React, { useCallback } from "react";
import Timer from "../Timer";
import { resendVerificationTokenAction } from "@/lib/actions/authAction";
import { toast } from "sonner";

interface ButtonResendEmailProps {
  data: {
    email: string;
    token: string;
    verification_send: boolean;
  };
}

const ButtonResendEmail: React.FC<ButtonResendEmailProps> = ({ data }) => {
  const onClickHandler = useCallback(async () => {
    const payload = {
      identifier: data.email,
      token: data.token,
    };
    const response = await resendVerificationTokenAction(payload);
    if (response?.status === "fail") {
      toast.error(response?.message);
    } else {
      toast.success("Token berhasil dikirimkan, periksa email Anda");
    }
  }, [data.email, data.token]);

  return (
    <button
      type="button"
      className="underline text-primary"
      onClick={onClickHandler}
    >
      Kirim ulang OTP
    </button>
  );
};

export default Timer(ButtonResendEmail);
