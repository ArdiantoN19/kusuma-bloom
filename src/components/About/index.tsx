import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import React from "react";

const AboutSection = () => {
  return (
    <section className="py-12 lg:py-20 container flex items-center flex-col md:flex-row gap-2 md:gap-x-8">
      <div className="w-full md:w-1/2">
        <p className="tracking-wider text-lg md:text-xl text-myOrange mb-2">
          TENTANG KAMI
        </p>
        <h3 className="text-primary font-bold text-2xl md:text-3xl mb-2">
          Kusuma Bloom
        </h3>
        <div className="line w-32 bg-myOrange mb-5"></div>
        <div className="mb-8 text-justify">
          <p className="mb-3">
            Kusuma Bloom didirikan sejak tahun 2023. Dengan membawa teknologi
            yang terkini, Kusuma Bloom hadir untuk mengatasi fenomena yang
            terjadi di tempat wisata Telaga Kusuma.
          </p>
          <p>
            Kusuma Bloom merupakan platform alternatif dalam pemesanan tiket
            secara online untuk tempat wisata Telaga Kusuma. Kami menyediakan
            akses yang mudah, cepat, dan harga terjangkau, serta menjamin
            keamanan transaksi dan data Anda.
          </p>
        </div>
        <div className="mb-10 flex items-center gap-x-2 md:px-2">
          <div className="pr-4 lg:pr-8 border-r border-muted text-center">
            <h4 className="font-semibold text-xl text-myOrange">100+</h4>
            <p className="text-black text-sm">Pengguna</p>
          </div>
          <div className="px-4 lg:px-8 border-r border-muted text-center">
            <h4 className="font-semibold text-xl text-myOrange">15+</h4>
            <p className="text-black text-sm">Fasilitas</p>
          </div>
          <div className="pl-4 lg:pl-8 border-muted text-center">
            <h4 className="font-semibold text-xl text-myOrange">20+</h4>
            <p className="text-black text-sm">Team Profesional</p>
          </div>
        </div>
        <button className="hidden md:flex items-center gap-x-2 p-1 bg-white border border-black shadow rounded-full pr-3 py-1 btn-shadow">
          <ArrowRight
            size={28}
            weight="bold"
            className="p-2 w-8 h-8 bg-gradient-primary text-white rounded-full"
          />
          Lihat lebih
        </button>
      </div>
      <div className="w-full md:w-1/2 flex flex-col md:flex-row lg:pr-10 justify-end xl:pr-36">
        <div className="w-full md:w-80 h-[27rem] relative mb-10 md:mb-0">
          <Image
            src={"/images/about/1.jpeg"}
            alt="sakura-portrait"
            width={100}
            height={100}
            className="object-cover w-full h-full rounded shadow-sm"
          />
          <Image
            src={"/images/about/2.jpg"}
            alt="sakura-portrait"
            width={100}
            height={100}
            className="absolute -bottom-5 -left-3 lg:-left-10 object-cover w-48 rounded shadow"
          />
        </div>
        <div className="md:hidden">
          <button className="flex items-center gap-x-2 p-1 bg-white border border-black shadow rounded-full pr-3 py-1 btn-shadow">
            <ArrowRight
              size={28}
              weight="bold"
              className="p-2 w-8 h-8 bg-gradient-primary text-white rounded-full"
            />
            Lihat lebih
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
