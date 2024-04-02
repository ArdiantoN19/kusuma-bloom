"use client";

import { Button } from "@/components/ui/button";
import useSnap from "@/hooks/useSnap";
import { checkValidTokenAction } from "@/lib/actions/transactionAction";
import {
  ResponseTypeMidtrans,
  snapErrorStatus,
  snapPendingStatus,
  snapSuccessStatus,
} from "@/lib/midtrans";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const PayOrderTicket = () => {
  const params = useSearchParams();
  const [isValidToken, setIsValidToken] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { snapEmbed } = useSnap();

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
      snapEmbed(params.get("token")!, "snap-container", {
        onSuccess: (result: ResponseTypeMidtrans) => {
          (async () => {
            await snapSuccessStatus(result);
          })();
        },
        onPending: (result: ResponseTypeMidtrans) => {
          (async () => {
            await snapPendingStatus(result);
          })();
        },
        onError: (result: any) => {
          (async () => {
            await snapErrorStatus(result);
          })();
        },
      });
    }
  }, [isValidToken, params, snapEmbed]);

  if (
    (!params.get("token") || params.get("token")?.length! !== 36) &&
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

  return !isLoading ? (
    <div id="snap-container" className="w-full h-full pt-5 rounded"></div>
  ) : (
    <div className="loader"></div>
  );
};

export default PayOrderTicket;
