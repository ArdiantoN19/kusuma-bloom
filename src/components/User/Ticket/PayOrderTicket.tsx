"use client";

import { Button } from "@/components/ui/button";
import { checkValidTokenAction } from "@/lib/actions/transactionAction";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

const PayOrderTicket = () => {
  const params = useSearchParams();
  const [isValidToken, setIsValidToken] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (params.get("token")) {
      (async () => {
        const isValid = await checkValidTokenAction(params.get("token")!);
        setIsValidToken(isValid);
        setIsLoading(false);
      })();
    }
  }, [params]);

  useEffect(() => {
    if (isValidToken) {
      window.snap.embed(params.get("token"), {
        embedId: "snap-container",
        onSuccess: (result: any) => {
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

          console.log("success", result);
        },
        onPending: (result: any) => {
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

          console.log("pending transaction", result);
        },
        onError: (result: any) => {
          // Jika token sudah expired fungsi ini dijalankan atau metode pembayaran sudah melewati masa bayar

          // Response
          // {
          //         error_messages: [ 'token is expired' ],
          // status_code: 407,
          // finish_redirect_url:
          //   'https://kuy-anime.vercel.app/error?order_id=trx-1711755592296'
          // }
          console.log("error transaction", result);
        },
        onClose: () => {
          console.log(
            "customer close the popup window without the finishing the payment"
          );
        },
      });
    }
  }, [isValidToken, params]);

  if (
    !params.get("token") ||
    params.get("token")?.length! !== 36 ||
    !isValidToken
  ) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center gap-2">
        {!isLoading ? (
          <>
            <h3>Token tidak valid</h3>
            <Button variant={"primary"} type="button" asChild>
              <Link href={"/user/ticket"}>Kembali</Link>
            </Button>
          </>
        ) : (
          <div className="loader"></div>
        )}
      </div>
    );
  }

  return <div id="snap-container" className="w-full h-full pt-5 rounded"></div>;
};

export default PayOrderTicket;
