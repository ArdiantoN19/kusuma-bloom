import RedirectOTP from "@/components/VerifyEmailOTP/RedirectOTP";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Verifikasi Email",
  description: "Verification Email page for Kusuma Bloom",
};

const Page = () => {
  return (
    <>
      <Suspense>
        <RedirectOTP />
      </Suspense>
    </>
  );
};

export default Page;
