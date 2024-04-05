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
import React, { useCallback, useEffect, useRef, useState } from "react";

import { useSession } from "next-auth/react";

const PayOrderTicket = () => {
  const { data: session } = useSession();
  const params = useSearchParams();
  const [isValidToken, setIsValidToken] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const snapContainer = useRef<HTMLDivElement>(null);

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

  const onShowPayment = useCallback(() => {
    if (isValidToken && snapContainer.current) {
      snapEmbed(params.get("token")!, snapContainer.current.id, {
        onSuccess: (result: ResponseTypeMidtrans) => {
          (async () => {
            await snapSuccessStatus(result, session?.user);
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
  }, [
    isValidToken,
    params,
    session?.user.email,
    session?.user.userId,
    snapEmbed,
  ]);

  useEffect(() => {
    const button = document.createElement("button");
    button.type = "button";
    button.onclick = onShowPayment;
    button.click();
  }, [onShowPayment]);

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
    <>
      <div
        ref={snapContainer}
        id="snap-container"
        className="w-full h-full pt-5 rounded"
      ></div>
    </>
  ) : (
    <div className="loader"></div>
  );
};

export default PayOrderTicket;
