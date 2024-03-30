"use client";
import PayOrderTicket from "@/components/User/Ticket/PayOrderTicket";
import React, { useEffect } from "react";

declare global {
  interface Window {
    snap: any;
  }
}

const CLIENT_KEY = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;

const Page = () => {
  useEffect(() => {
    // const snapSrcUrl = "https://app.stg.midtrans.com/snap/snap.js";
    const snapSrcUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    const myMidtransClientKey = `${CLIENT_KEY}`;

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = snapSrcUrl;
    script.setAttribute("data-client-key", myMidtransClientKey);
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return (
    <div className="container w-full h-[90dvh] grid place-items-center">
      <PayOrderTicket />
    </div>
  );
};

export default Page;
