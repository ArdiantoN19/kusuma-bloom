"use client";

import { Button } from "@/components/ui/button";
import React, { useRef, useState } from "react";

import { scanQRCode } from "@/utils/qrcode";
import { cn } from "@/lib/utils";
import {
  confirmScanTicketByTransactionIdAction,
  getScanTicketByTransactionIdAction,
} from "@/lib/actions/scanTicketAction";
import { toast } from "sonner";
import { ResponseTransactionWithDiscount } from "@/types/transactionAction";
import DetailScan from "./DetailScan";
import { Check, Scan } from "@phosphor-icons/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const ScanQRCode = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const scanElement = useRef<HTMLDivElement>(null);
  const [isShowScan, setIsShowScan] = useState<boolean>(false);
  const [scanValue, setScanValue] = useState<{
    id: string;
    data: ResponseTransactionWithDiscount;
  }>({
    id: "",
    data: {} as ResponseTransactionWithDiscount,
  });

  const onClickScanHandler = async () => {
    setIsShowScan((prev) => !prev);
    if (scanElement.current) {
      await scanQRCode(scanElement.current, async (value: string) => {
        if (value) {
          setIsShowScan((prev) => !prev);
          const response = await getScanTicketByTransactionIdAction(value);
          if (response.status !== "success") {
            toast.error(response.message);
          } else {
            setScanValue({ id: value, data: response.data! });
            toast.success(response.message);
            router.refresh();
          }
        }
      });
    }
  };

  const onClickConfirmHandler = async () => {
    const response = await confirmScanTicketByTransactionIdAction(
      scanValue.id,
      session?.user.userId
    );
    if (response.status !== "success") {
      toast.error(response.message);
    } else {
      toast.success(response.message);
      setScanValue({ id: "", data: {} as ResponseTransactionWithDiscount });
    }
  };

  return (
    <>
      <div className="w-full min-h-[60dvh] flex flex-col justify-center items-center gap-y-4">
        {!scanValue.id ? (
          <Button
            variant={"primary"}
            type="button"
            onClick={onClickScanHandler}
          >
            Scan Now <Scan size={20} />
          </Button>
        ) : (
          <Button
            variant={"primary"}
            type="button"
            onClick={onClickConfirmHandler}
          >
            Konfirmasi <Check size={20} />
          </Button>
        )}
        {scanValue.id && <DetailScan transaction={scanValue.data} />}
      </div>
      <div
        className={cn(
          "fixed z-50 top-0 left-0 w-full h-screen bg-black/80 backdrop-blur",
          isShowScan ? "block" : "hidden"
        )}
      >
        <div className="w-full h-full flex items-center justify-center flex-col gap-y-3 px-5">
          <div
            ref={scanElement}
            className="w-full md:w-[500px] md:h-[350px] bg-white rounded relative overflow-hidden"
          >
            <div className="w-full absolute top-2 left-0 h-1 bg-white shadow animate-slide-up-down"></div>
          </div>
          <h3 className="p-2 border border-primary text-primary bg-white rounded text-sm text-justify">
            Scan QR Code pada kamera, QR Code akan otomatis terdeteksi oleh
            sistem!
          </h3>
        </div>
      </div>
    </>
  );
};

export default ScanQRCode;
