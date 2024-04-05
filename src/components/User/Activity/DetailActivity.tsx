"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  ResponseTransactionWithDiscount,
  TRANSACTION_STATUS,
} from "@/types/transactionAction";
import { dateFormatter, hiddenTextFormatter, rupiahFormatter } from "@/utils";
import { ArrowLeft, CheckCircle, QrCode, XCircle } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

interface DetailActivityProps {
  transaction: ResponseTransactionWithDiscount;
}

const StatusTransaction: React.FC<{ status: TRANSACTION_STATUS }> = ({
  status,
}) => {
  if (status === TRANSACTION_STATUS.FAILURE) {
    return (
      <div className="flex items-center gap-x-1 mb-1">
        <XCircle size={16} className="text-red-400" weight="fill" />
        <p className="text-xs text-muted-foreground capitalize">
          Transaksi Gagal
        </p>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-x-1 mb-1">
      <CheckCircle size={16} className="text-primary" weight="fill" />
      <p className="text-xs text-muted-foreground capitalize">
        Transaksi Berhasil
      </p>
    </div>
  );
};

const DetailActivity: React.FC<DetailActivityProps> = ({ transaction }) => {
  const router = useRouter();
  const total = transaction.price * transaction.quantity;

  return (
    <div className="h-[10.5rem] bg-primary container relative">
      <div className="flex justify-between items-center sticky pb-3 pt-5 mb-2 text-white w-full top-0 z-10 bg-primary">
        <button
          type="button"
          title="dashboard"
          onClick={() => router.push("/user/activity?orderBy=newest")}
        >
          <ArrowLeft size={20} weight="bold" />
        </button>
        <h2 className="font-bold text-sm">Transaksi</h2>
        <div className="size-3"></div>
      </div>
      <div className="min-h-screen md:min-h-full pb-28 md:pb-10">
        <div className="relative top-0 rounded-md w-full shadow-sm md:max-w-md bg-white p-2 border mx-auto mb-5">
          <div className="border-dashed border-2 px-3 pt-5 pb-3 rounded h-auto">
            <div className="text-xl rounded-full text-primary font-semibold flex items-center flex-col gap-1 mb-8">
              <Image
                src={"/images/logo-telaga-kusuma.png"}
                width={32}
                height={32}
                alt="logo-telaga-kusuma"
                className="size-8 object-cover"
              />{" "}
              Kusuma Bloom
            </div>
            <div className="text-xs flex justify-between items-center text-muted-foreground border-b pb-3 mb-2">
              <p>{dateFormatter(transaction.created_at.toISOString())}</p>
              <p>{hiddenTextFormatter(transaction.id)}</p>
            </div>
            <div className="mb-2">
              <StatusTransaction status={transaction.status} />
              <h3 className="font-bold text-sm">Pemesanan tiket</h3>
              <div className="text-xs mb-4">
                Metode Pembayaran:{" "}
                <Badge className="bg-primary uppercase text-[.6rem] hover:bg-primary">
                  {transaction.payment_type}
                </Badge>
              </div>
            </div>
            <Accordion
              type="multiple"
              defaultValue={["detailOrder"]}
              className="mb-3"
            >
              <AccordionItem value="total">
                <AccordionTrigger className="p-2 bg-green-100 rounded font-bold mb-3 hover:no-underline">
                  Total:{" "}
                  {rupiahFormatter(transaction.gross_amount).slice(0, -3)}
                </AccordionTrigger>
                <AccordionContent className="px-2 border-0">
                  {transaction.discountMember || transaction.discountVoucher ? (
                    <div className="mb-0">
                      <h3 className="font-bold mb-1">Diskon</h3>
                      <div className="space-y-1">
                        {transaction.discountMember && (
                          <div className="flex justify-between items-center text-xs">
                            <h6 className="text-muted-foreground">
                              Diskon member
                            </h6>
                            <p className="text-primary">
                              {rupiahFormatter(transaction.discountMember)}
                            </p>
                          </div>
                        )}
                        {transaction.discountVoucher && (
                          <div className="flex justify-between items-center text-xs">
                            <h6 className="text-muted-foreground">
                              Diskon voucher
                            </h6>
                            <p className="text-primary">
                              {rupiahFormatter(transaction.discountVoucher)}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center text-xs">
                      <h6 className="text-muted-foreground">Total</h6>
                      <p className="text-primary">{rupiahFormatter(total)}</p>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="detailOrder">
                <AccordionTrigger className="font-bold hover:no-underline">
                  Detail Pesanan
                </AccordionTrigger>
                <AccordionContent className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <p>Nama</p>
                    <p>{transaction.user.name}</p>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <p>Email</p>
                    <p>{transaction.user.email}</p>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <p>Status Pembayaran</p>
                    {transaction.status === TRANSACTION_STATUS.SUCCESS ? (
                      <p className="px-1.5 py-1 border border-primary rounded-sm text-primary">
                        Berhasil
                      </p>
                    ) : (
                      <p className="px-1 py-0.5 border border-red-400 rounded-sm text-red-400">
                        Gagal
                      </p>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <p>Tanggal Berlaku Tiket</p>
                    <p>{dateFormatter(transaction.expired.toDateString())}</p>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <p>Jumlah Tiket</p>
                    <p>{transaction.quantity}</p>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <p>Harga Tiket</p>
                    <p>{rupiahFormatter(transaction.price)}</p>
                  </div>
                  {transaction.discountMember && (
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <p>Diskon Member</p>
                      <p>{transaction.discountMember}</p>
                    </div>
                  )}
                  {transaction.discountVoucher && (
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <p>Diskon Voucher</p>
                      <p>{rupiahFormatter(transaction.discountVoucher)}</p>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <p>Total</p>
                    <div className="flex gap-x-1">
                      {transaction.discountMember ||
                      transaction.discountVoucher ? (
                        <p className="line-through text-muted">
                          {rupiahFormatter(total)}
                        </p>
                      ) : (
                        <p>{rupiahFormatter(total)}</p>
                      )}
                      {transaction.discountMember &&
                        transaction.discountVoucher && (
                          <p>
                            {rupiahFormatter(
                              total -
                                transaction.discountMember -
                                transaction.discountVoucher
                            )}
                          </p>
                        )}
                      {transaction.discountMember && (
                        <p>
                          {rupiahFormatter(total - transaction.discountMember)}
                        </p>
                      )}
                      {transaction.discountVoucher && (
                        <p>
                          {rupiahFormatter(total - transaction.discountVoucher)}
                        </p>
                      )}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            {transaction.status === TRANSACTION_STATUS.SUCCESS ? (
              <div className="p-2 border border-primary text-primary bg-green-50/90 rounded text-xs text-justify">
                Terima kasih sudah memesanan tiket dari Kusuma Bloom. Bukti
                pembelian dan tiket Anda telah kami dikirimkan lewat email.
              </div>
            ) : (
              <div className="p-2 border border-red-400 text-red-400 bg-red-50/90 rounded text-xs text-justify">
                Transaksi Anda telah gagal dilakukan, harap lakukan pemesanan
                tiket ulang.
              </div>
            )}
          </div>
          <Link
            href={`/user/qr-code/${transaction.id}`}
            className="absolute top-5 right-5 text-primary hover:bg-slate-100"
            title="QR Code"
          >
            <QrCode size={22} />
          </Link>
        </div>
        <div className="text-center text-xs">
          <p>
            Powered by <span className="text-primary">Kusuma Bloom</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailActivity;
