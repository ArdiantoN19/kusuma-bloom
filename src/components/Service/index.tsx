import {
  HandCoins,
  SealCheck,
  ShieldChevron,
} from "@phosphor-icons/react/dist/ssr";
import React, { FunctionComponent } from "react";

const ServiceSection: FunctionComponent = () => {
  return (
    <section className="py-12">
      <div className="container flex items-start flex-col lg:flex-row gap-x-10">
        <div className="mb-5 w-full lg:w-2/5">
          <p className="tracking-wider text-lg md:text-xl text-myOrange mb-2">
            LAYANAN KAMI
          </p>
          <div className="mb-5">
            <h3 className="font-bold text-2xl md:text-3xl text-primary mb-2 ">
              Mengapa <span className="text-primary">Harus</span> kami?
            </h3>
            <div className="w-32">
              <div className="line bg-myOrange"></div>
            </div>
          </div>
          <p className="text-base text-justify mb-8">
            Kami menawarkan Pengalaman Liburan kepada Anda dengan Harga
            Terjangkau, Keamanan yang Terjamin, dan Kemudahan yang Tidak
            Tertandingi!
          </p>
        </div>
        <div className="w-full lg:w-3/5 grid grid-cols-2 md:grid-cols-3 gap-y-4 md:gap-y-0">
          <div className="p-2 xl:p-5 flex flex-col items-center text-center">
            <HandCoins size={55} weight="light" className="text-primary mb-3" />
            <h5 className="font-semibold mb-2 text-lg">Harga Terjangkau</h5>
            <p className="text-xs">
              Menyediakan harga tiket yang terjangkau dengan berbagai pilihan
              paket yang sesuai dengan budget pengunjung.
            </p>
          </div>
          <div className="p-2 xl:p-5 flex flex-col items-center text-center">
            <ShieldChevron
              size={55}
              weight="light"
              className="text-primary mb-3"
            />
            <h5 className="font-semibold mb-2 text-lg">Aman dan Terjamin</h5>
            <p className="text-xs">
              Memberikan jaminan keamanan dan keabsahan dari transaksi tiket.
            </p>
          </div>
          <div className="p-2 xl:p-5 flex flex-col items-center text-center">
            <SealCheck size={55} weight="light" className="text-primary mb-3" />
            <h5 className="font-semibold mb-2 text-lg">Mudah digunakan</h5>
            <p className="text-xs">
              Kemudahan dalam proses pemesanan tiket online melalui website yang
              interaktif
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
