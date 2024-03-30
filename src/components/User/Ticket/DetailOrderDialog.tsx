"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { dateFormatter, rupiahFormatter } from "@/utils";
import { Info } from "@phosphor-icons/react";
import React from "react";

interface DetailOrderDialogProps {
  user: {
    email: string;
    name: string;
  };
  date: Date;
  discountMember: number;
  discountVoucher: number;
  quantity: number;
  price: number;
  total: number;
}

const DetailOrderDialog: React.FC<DetailOrderDialogProps> = (props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-primary underline text-xs" type="button">
          Rincian pembelian
        </button>
      </DialogTrigger>
      <DialogContent className="bg-white max-w-[350px] md:min-w-[350px] md:max-w-md rounded">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-1">
            <Info size={20} />
            Rincian pembelian
          </DialogTitle>
          <DialogDescription className="text-start">
            Tinjau dan pastikan data pembelian anda telah sesuai sebelum
            melakukan pembayaran.
          </DialogDescription>
        </DialogHeader>
        <div className="text-sm">
          <div className="pb-3 border-b mb-3">
            <h3 className="font-bold mb-1">Detail transaksi</h3>
            <div className="space-y-2 text-xs">
              <div>
                <h6 className="font-bold">Nama</h6>
                <p className="text-muted-foreground">{props.user.name}</p>
              </div>
              <div>
                <h6 className="font-bold">Email</h6>
                <p className="text-muted-foreground">{props.user.email}</p>
              </div>
              <div>
                <h6 className="font-bold">Tanggal pembelian</h6>
                <p className="text-muted-foreground">
                  {dateFormatter(new Date().toISOString())}
                </p>
              </div>
              <div>
                <h6 className="font-bold">Tanggal berlaku</h6>
                <p className="text-muted-foreground">
                  {dateFormatter(props.date.toISOString())}
                </p>
              </div>
            </div>
          </div>
          {(props.discountMember > 0 || props.discountVoucher > 0) && (
            <div className="pb-3 border-b mb-3">
              <h3 className="font-bold mb-1">Diskon</h3>
              <div className="space-y-1">
                {props.discountMember > 0 && (
                  <div className="flex justify-between items-center text-xs">
                    <h6 className="text-muted-foreground">Diskon member</h6>
                    <p className="text-primary">
                      {rupiahFormatter(props.discountMember)}
                    </p>
                  </div>
                )}
                {props.discountVoucher > 0 && (
                  <div className="flex justify-between items-center text-xs">
                    <h6 className="text-muted-foreground">Diskon voucher</h6>
                    <p className="text-primary">
                      {rupiahFormatter(props.discountVoucher)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
          <div>
            <h3 className="font-bold">Total</h3>
            <div className="flex justify-between items-center font-bold">
              <div className="text-muted-foreground font-normal text-xs">
                {props.quantity} x {rupiahFormatter(props.price)}
              </div>
              {props.discountMember > 0 && props.discountVoucher > 0 ? (
                <div className="space-x-2 flex items-center">
                  <p className="line-through">{rupiahFormatter(props.total)}</p>
                  <p className="text-primary">
                    {rupiahFormatter(
                      props.total - props.discountVoucher - props.discountMember
                    )}
                  </p>
                </div>
              ) : props.discountVoucher > 0 ? (
                <div className="space-x-2 flex items-center">
                  <p className="line-through">{rupiahFormatter(props.total)}</p>
                  <p className="text-primary">
                    {rupiahFormatter(props.total - props.discountVoucher)}
                  </p>
                </div>
              ) : props.discountMember > 0 ? (
                <div className="space-x-2 flex items-center">
                  <p className="line-through">{rupiahFormatter(props.total)}</p>
                  <p className="text-primary">
                    {rupiahFormatter(props.total - props.discountMember)}
                  </p>
                </div>
              ) : (
                rupiahFormatter(props.total)
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DetailOrderDialog;
