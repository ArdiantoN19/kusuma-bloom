"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ResponseTransaction } from "@/types/transactionAction";
import { dateFormatter, rupiahFormatter } from "@/utils";
import { CheckCircle, Clock, Ticket, XCircle } from "@phosphor-icons/react";
import Link from "next/link";
import React from "react";

interface CardPaymentStatusProps {
  transaction: ResponseTransaction;
  transactionStatus: string;
}

const CardPaymentStatusSuccess: React.FC = () => {
  return (
    <>
      <CheckCircle
        size={95}
        weight="fill"
        className="text-primary mx-auto mb-5 animate-pulse"
      />
      <div className="space-y-6 text-center mb-8">
        <h1 className="font-bold text-xl">Pembayaran Sukses</h1>
        <p className="text-muted-foreground text-sm">
          Pembayaran Anda telah kami terima. Harap tunggu email secara berkala
          untuk mendapatkan Qr Code sebagai bukti tiket online dari Kusuma Bloom
        </p>
      </div>
    </>
  );
};

const CardPaymentPendingStatus: React.FC = () => {
  return (
    <>
      <Clock
        size={95}
        weight="fill"
        className="text-myOrange mx-auto mb-5 animate-pulse"
      />
      <div className="space-y-6 text-center mb-8">
        <h1 className="font-bold text-xl">Menunggu Pembayaran</h1>
        <p className="text-muted-foreground text-sm">
          Segera selesaikan pembayaran Anda. Agar segera mendapatkan email yang
          berisi Qr Code sebagai bukti tiket online dari Kusuma Bloom
        </p>
      </div>
    </>
  );
};
const CardPaymentErrorStatus: React.FC = () => {
  return (
    <>
      <XCircle
        size={95}
        weight="fill"
        className="text-red-400 mx-auto mb-5 animate-pulse"
      />
      <div className="space-y-6 text-center mb-8">
        <h1 className="font-bold text-xl">Pembayaran Gagal</h1>
        <p className="text-muted-foreground text-sm">
          Pembayaran Anda gagal dilakukan. Harap segera pesan kembali tiket
          untuk menikmati keseruan di Kusuma Bloom
        </p>
      </div>
    </>
  );
};

const CardPaymentStatus: React.FC<CardPaymentStatusProps> = ({
  transaction,
  transactionStatus,
}) => {
  return (
    <div className="container w-full h-[90dvh] flex flex-col items-center justify-between pt-10">
      {!transaction ? (
        <div className="flex items-center justify-center h-52 flex-col gap-y-2">
          <Ticket size={42} className="text-primary" />
          <h1 className="text-sm text-center">Transaksi tidak ditemukan</h1>
        </div>
      ) : (
        <div>
          {transactionStatus === "pending" ? (
            <CardPaymentPendingStatus />
          ) : transactionStatus === "capture" ||
            transactionStatus === "settlement" ? (
            <CardPaymentStatusSuccess />
          ) : (
            <CardPaymentErrorStatus />
          )}
          <Card className="w-full">
            <CardContent className="p-5">
              <div className="border-b pb-3">
                <h3 className="font-bold text-sm">Pesanan dibuat pada</h3>
                <p className="text-xs">
                  {dateFormatter(transaction.created_at.toISOString())}
                </p>
              </div>
              <div className="pt-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-sm">Total</h3>

                  <h3 className="font-bold text-sm">
                    {rupiahFormatter(transaction.gross_amount)}{" "}
                    {transactionStatus === "pending" ? (
                      <span className="uppercase text-myOrange">(pending)</span>
                    ) : transactionStatus === "capture" ||
                      transactionStatus === "settlement" ? (
                      <span className="uppercase text-primary">(sukses)</span>
                    ) : (
                      <span className="uppercase text-red-400">(gagal)</span>
                    )}
                  </h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      <Button className="w-full h-[45px]" variant={"primary"} asChild>
        <Link href={"/user/dashboard"}>Kembali</Link>
      </Button>
    </div>
  );
};

export default CardPaymentStatus;
