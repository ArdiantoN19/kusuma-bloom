"use client";

import { ResponseTypeMidtrans } from "@/lib/midtrans";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

declare global {
  interface Window {
    snap: any;
  }
}

const CLIENT_KEY = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;

const useSnap = () => {
  const [snap, setSnap] = useState<any>("");
  const router = useRouter();

  useEffect(() => {
    // const snapSrcUrl = "https://app.stg.midtrans.com/snap/snap.js";
    const snapSrcUrl = `${process.env.NEXT_PUBLIC_BASE_URL_MIDTRANS_API}/snap/snap.js`;
    const myMidtransClientKey = `${CLIENT_KEY}`;

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = snapSrcUrl;
    script.setAttribute("data-client-key", myMidtransClientKey);
    script.async = true;
    script.onload = () => {
      setSnap(window.snap);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const snapEmbed = (
    snapToken: string,
    embedId: string,
    action: Record<string, any>
  ) => {
    if (snap) {
      snap.embed(snapToken, {
        embedId,
        onSuccess: (result: ResponseTypeMidtrans) => {
          action.onSuccess(result);
          // Jika sukses dalam pembyaran fungsi ini dijalankan

          // Response
          // {
          //   status_code: '200',
          //   status_message: 'Success, transaction is found',
          //   transaction_id: 'd161ae02-4d52-4abd-9ea9-7c401f4296ad',
          //   order_id: 'trx-1711770730247',
          //   gross_amount: '15000.00',
          //   payment_type: 'qris',
          //   transaction_time: '2024-03-30 10:52:29',
          //   transaction_status: 'settlement',
          //   fraud_status: 'accept',
          //   finish_redirect_url:
          //     'https://kuy-anime.vercel.app/finish?order_id=trx-1711770730247&status_code=200&transaction_status=settlement'
          // }

          // console.log("success", result);
        },
        onPending: (result: ResponseTypeMidtrans) => {
          action.onPending(result);
          // jika klik tutup ketika sudah pilih metode pembayaran fungsi ini dijalankan
          // Response
          // {
          //   status_code: '201',
          //   status_message: 'Success, transaction is found',
          //   transaction_id: '10ff235a-704a-44ec-8896-c6458e5b81d8',
          //   order_id: 'trx-1711770134621',
          //   gross_amount: '30000.00',
          //   payment_type: 'qris',
          //   transaction_time: '2024-03-30 10:44:06',
          //   transaction_status: 'pending',
          //   fraud_status: 'accept',
          //   finish_redirect_url:
          //     'https://kuy-anime.vercel.app/finish?order_id=trx-1711770134621&status_code=201&transaction_status=pending'
          // }
        },
        onError: (result: any) => {
          action.onError(result);
          // Jika token sudah expired fungsi ini dijalankan atau metode pembayaran sudah melewati masa bayar

          // Response
          // {
          //         error_messages: [ 'token is expired' ],
          // status_code: 407,
          // finish_redirect_url:
          //   'https://kuy-anime.vercel.app/error?order_id=trx-1711755592296'
          // }
          // console.log("error transaction", result);
        },
        onClose: () => {
          console.log(
            "customer close the popup window without the finishing the payment"
          );
          router.push("/user/dashboard");
        },
      });
    }
  };
  return { snapEmbed };
};

export default useSnap;
