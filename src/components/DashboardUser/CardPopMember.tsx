"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Alert, { AlertType } from "../Alert";
import { Star, X } from "@phosphor-icons/react";
import Link from "next/link";

interface CardPopMemberProps {
  isPopMember: boolean;
  onClickUpdatePopMemberHandler: () => void;
}

const CardPopMember: React.FC<CardPopMemberProps> = ({
  isPopMember,
  onClickUpdatePopMemberHandler,
}) => {
  return (
    isPopMember && (
      <div
        className="w-full min-h-screen fixed z-[51] top-0 left-0 flex items-center justify-center backdrop-blur bg-black/50"
        onClick={onClickUpdatePopMemberHandler}
      >
        <Card className="w-[350px] md:max-w-screen-md relative">
          <button
            type="button"
            onClick={onClickUpdatePopMemberHandler}
            className="absolute top-3 right-3 size-8 grid place-items-center"
          >
            <X size={16} />
          </button>
          <CardHeader>
            <CardTitle>
              <Star size={28} className="mb-3 text-primary" weight="fill" />
              Ayo Gabung Menjadi member Pro Kami
            </CardTitle>
            <CardDescription>Ikuti persyaratan dibawah ini:</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside text-sm mb-3">
              <li>
                Melengkapi data diri pada{" "}
                <Link
                  href={"/user/account"}
                  className="underline text-primary inline"
                >
                  akun
                </Link>
              </li>
              <li>
                Mengisi formulir pendaftaran{" "}
                <Link href={"/"} className="underline text-primary inline">
                  member
                </Link>
              </li>
              <li>
                Member merupakan pihak yang ingin menjalin kerja dengan kami
                dibuktikan dengan MOU.
              </li>
            </ul>
            <Alert type={AlertType.INFO}>
              <p>
                Member user akan melewati proses verifikasi maksimal 2x24 jam
              </p>
            </Alert>
          </CardContent>
        </Card>
      </div>
    )
  );
};

export default CardPopMember;
