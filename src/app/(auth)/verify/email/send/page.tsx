import FormVerifyEmailOTP from "@/components/VerifyEmailOTP/FormVerifyEmailOTP";
import { Metadata } from "next";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "Verifikasi Email OTP",
  description: "Verification email with otp schema for Kusuma Bloom",
};

const Page: React.FC = () => {
  return (
    <div className="container min-h-screen w-full flex justify-center items-center">
      <div className="max-w-sm">
        <div className="mb-5">
          <h3>Verifikasi Email Anda.</h3>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <FormVerifyEmailOTP />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;
