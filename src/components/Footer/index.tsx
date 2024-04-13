import { rupiahFormatter } from "@/utils";
import { MapPin, Ticket, Watch } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { socials } from "../MainFooter";

const Footer = () => {
  return (
    <footer className="py-12 bg-gradient-primary">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 w-full gap-y-4 md:gap-y-0 md:grid-cols-3 p-2 rounded md:rounded-full bg-white shadow-sm border lg:py-5 mb-10 lg:mb-12 md:divide-x">
            <div className="flex items-center md:justify-center gap-x-2">
              <MapPin size={35} className="text-primary" />
              <div>
                <h5 className="font-bold">Lokasi</h5>
                <p className="text-sm text-muted">
                  Tawun, Tunggulrejo, Jumantono, Karanganyar (57782)
                </p>
              </div>
            </div>
            <div className="flex items-center md:justify-center gap-x-2">
              <Ticket size={35} className="text-primary" />
              <div>
                <h5 className="font-bold">Harga Tiket</h5>
                <p className="text-sm text-muted">{rupiahFormatter(15000)}</p>
              </div>
            </div>
            <div className="flex items-center md:justify-center gap-x-2">
              <Watch size={35} className="text-primary" />
              <div>
                <h5 className="font-bold">Jam Buka</h5>
                <p className="text-sm text-muted">07.00 - 18.30</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8 md:items-center justify-center mb-5">
            <Link
              href={"/"}
              className="text-xl rounded-full text-primary bg-white px-2.5 py-1 font-semibold flex items-center gap-2"
            >
              <Image
                src={"/images/logo-telaga-kusuma.png"}
                width={32}
                height={32}
                alt="logo-telaga-kusuma"
                className="w-7 h-7 object-cover"
              />{" "}
              Kusuma Bloom
            </Link>
            <Link href={"/"} className="text-white hover:text-myOrange">
              Home
            </Link>
            <Link href={"/about"} className="text-white hover:text-myOrange">
              Layanan
            </Link>
            <Link href={"/about"} className="text-white hover:text-myOrange">
              Fasilitas
            </Link>
            <Link href={"/about"} className="text-white hover:text-myOrange">
              Tentang Kami
            </Link>
          </div>
          <div className="flex items-center gap-x-4 md:justify-center">
            {socials.map((social) => (
              <Link
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noferrer"
                className="size-10 flex items-center justify-center"
                title={social.name}
              >
                {
                  <social.icon
                    size={32}
                    className="text-white hover:text-myOrange"
                  />
                }
              </Link>
            ))}
          </div>
          <div className="h-1 border-b my-5"></div>
          <div className="text-center text-sm text-white">
            &copy;{new Date().getFullYear()} Kusuma Bloom. All Rights Reserved
            <p className="text-sm">
              Made with ❤️ by{" "}
              <Link
                href={"https://github.com/ArdiantoN19"}
                className="hover:text-myOrange"
                target="_blank"
                rel="noreferrer"
              >
                Ardianto
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
