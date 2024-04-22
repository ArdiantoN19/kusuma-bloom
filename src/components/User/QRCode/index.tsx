"use client";

import React, { useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { QrCode } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { toPng } from "html-to-image";
import useQRCode from "@/hooks/useQrCode";

interface QRCodeProps {
  id: string;
}

const QRCode: React.FC<QRCodeProps> = ({ id }) => {
  const qrCodeElement = useRef<HTMLImageElement>(null);
  const [qrCodeUrl] = useQRCode(id);

  const onDownloadQrCodeHandler = useCallback(async () => {
    if (!qrCodeElement.current) return;
    try {
      const dataUrl = await toPng(qrCodeElement.current, { cacheBust: false });
      const link = document.createElement("a");
      const filename = `${id}-${new Date().getDate()}${new Date().getMonth()}${new Date().getFullYear()}.png`;

      link.download = filename;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("failed to download image", error);
    }
  }, [id]);

  return (
    <div className="container w-full h-[80dvh] grid place-items-center">
      <div className="w-full max-w-xs">
        <div ref={qrCodeElement} className="mb-10 w-full">
          <div className="text-xl text-primary font-semibold flex items-center flex-col gap-1 mb-8">
            <Image
              src={"/images/logo-telaga-kusuma.png"}
              width={32}
              height={32}
              alt="logo-telaga-kusuma"
              className="size-8 object-cover"
            />{" "}
            Kusuma Bloom
          </div>
          <Image
            src={qrCodeUrl}
            alt={id}
            width={250}
            height={250}
            className="size-[250px] mx-auto bg-green-100 rounded-sm shadow-sm border"
            priority
          />
        </div>
        <div className="space-y-2">
          <Button
            variant={"primary"}
            className="w-full"
            onClick={onDownloadQrCodeHandler}
          >
            Download Qr Code
            <QrCode size={20} />
          </Button>
          <Button variant={"primary"} className="w-full" asChild>
            <Link href={"/user/dashboard"}>Kembali</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QRCode;
