import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { ResponseTransactionWithDiscount } from "@/types/transactionAction";
import { dateFormatter, rupiahFormatter } from "@/utils";
import Image from "next/image";
import React from "react";

interface DetailScanProps {
  transaction: ResponseTransactionWithDiscount;
}

const DetailScan: React.FC<DetailScanProps> = ({ transaction }) => {
  const total = transaction.price * transaction.quantity;

  return (
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
            <p>{transaction.id}</p>
          </div>
          <div className="mb-2">
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
                Total: {rupiahFormatter(transaction.gross_amount).slice(0, -3)}
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
                  <p className="px-1.5 py-1 border border-primary rounded-sm text-primary">
                    Berhasil
                  </p>
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
          <div className="p-2 border border-primary text-primary bg-green-50/90 rounded text-xs text-justify">
            Scan tiket Kusuma Bloom berhasil dilakukan. Harap periksa kembali
            dengan seksama data dari pelanggan.
          </div>
        </div>
      </div>
      <div className="text-center text-xs">
        <p>
          Powered by <span className="text-primary">Kusuma Bloom</span>
        </p>
      </div>
    </div>
  );
};

export default DetailScan;
