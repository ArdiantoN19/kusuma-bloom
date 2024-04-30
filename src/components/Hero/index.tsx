"use client";

import React, { FunctionComponent, useEffect, useState } from "react";
import { rupiahFormatter } from "@/utils";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { seaweedScript } from "@/utils/font";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { ResponseTicket } from "@/types/ticketAction";
import { getActiveTicketAction } from "@/lib/actions/ticketAction";
import imageHero from "../../../public/images/woman-take-picture.png";

export const dynamic = "force-dynamic";

const HeroSection: FunctionComponent = () => {
  const { data: session } = useSession();
  const [activeTicket, setActiveTicket] = useState<ResponseTicket | null>(null);
  useEffect(() => {
    (async () => {
      const response = await getActiveTicketAction();
      if (response.status === "success" && response.data) {
        setActiveTicket(response.data);
      }
    })();
  }, []);

  return (
    <section className="container lg:min-h-[65dvh] xl:min-h-[50dvh] mt-5 md:mt-10 pb-10">
      <div className="w-full flex items-center flex-col-reverse lg:flex-row md:gap-y-3 lg:gap-y-0">
        <div className="w-full lg:w-1/2 xl:w-3/5">
          <div className="mb-5 lg:mb-10">
            <h1 className="text-2xl md:text-4xl lg:text-4xl xl:text-5xl font-bold leading-tight mb-2 lg:mb-4">
              Pemesanan{" "}
              <span
                className={`${seaweedScript.className} font-thin text-primary text-4xl md:text-6xl xl:text-7xl `}
              >
                Ticket Online
              </span>{" "}
              untuk Telaga Kusuma, Telusuri informasi kita sekarang
            </h1>
            <div className="line w-20 md:w-40 lg:w-60 bg-myOrange"></div>
          </div>

          <div className="text-justify mb-8 lg:mb-14 w-full xl:w-5/6">
            <p className="text-sm md:text-base">
              Kusuma Bloom menyediakan solusi atas permasalahan pemesanan tiket
              yang terbatas. Pengunjung juga dapat memperoleh informasi yang
              lengkap dan jelas tentang tempat wisata Telaga Kusuma. Kusuma
              Bloom berfokus pada kemudahan, kenyamanan, dan aksesibilitas
              pengunjung.
            </p>
          </div>
          <div className="flex">
            <Link
              href={"/user/ticket"}
              className="bg-gradient-primary btn-shadow flex items-center px-10 py-2.5 text-white shadow rounded-full border-2 border-black gap-x-3"
            >
              Ayo Pesan Sekarang{" "}
              <ArrowRight
                size={24}
                weight="bold"
                className="animate-slide-right w-8 h-8 p-2 rounded-full bg-white text-primary"
              />
            </Link>
          </div>
        </div>
        <div className="w-full lg:w-1/2 xl:w-2/5 relative">
          <Image
            src={imageHero}
            typeof="image/png"
            alt="two people take a picture"
            className="w-full h-[23rem] lg:h-auto md:object-cover"
            width={300}
            height={300}
            priority
            quality={100}
            placeholder="blur"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="p-3 min-w-40 bg-white border rounded-lg absolute top-0 lg:top-5 left-0 flex items-center gap-x-3">
            <div>
              <p className="text-xs text-muted">Harga hari ini:</p>
              <h3 className="text-black">
                {!activeTicket
                  ? rupiahFormatter(15000)
                  : rupiahFormatter(activeTicket.price)}
              </h3>
            </div>
            {session?.user ? (
              <Link
                href={"/user/ticket"}
                className="bg-gradient-primary px-2.5 py-1 rounded-full text-white text-xs"
              >
                Pesan
              </Link>
            ) : (
              <button
                onClick={() =>
                  signIn("credentials", { callbackUrl: "/user/ticket" })
                }
                className="bg-gradient-primary px-2.5 py-1 rounded-full text-white text-xs"
              >
                Pesan
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
