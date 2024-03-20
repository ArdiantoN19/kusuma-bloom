import Image from "next/image";
import React, { FunctionComponent } from "react";

const GuidenceSection: FunctionComponent = () => {
  return (
    <section className="pt-14 pb-10 container flex items-center flex-col md:flex-row gap-2 md:gap-x-8">
      <div className="w-full md:w-1/2">
        <div className="aspect-video w-3/4 rounded border border-black h-32"></div>
      </div>
      <div className="w-full md:w-1/2">
        <p className="tracking-wider text-lg md:text-xl text-myOrange mb-2">
          Panduan Penggunaan Website
        </p>
        <h3 className="text-primary font-bold text-2xl md:text-3xl mb-2">
          Panduan Kusuma Bloom
        </h3>
        <div className="line w-32 bg-myOrange mb-5"></div>
        <div className="mb-8 text-justify">
          <p className="mb-3">
            Anda tidak perlu risau menggunakan website Kusuma Bloom. Kini
            panduan penggunaan website telah hadir dalam bentuk video berdurasi
            3 menit yang dapat menjelaskan secara jelas bagaimana cara
            menggunakan website Kusuma Bloom.
          </p>
          <p>
            Panduan ini akan menjelaskan dari mulai cara mendaftar akun hingga
            pada cara pemesanan tiket. Semua akan dibahas pada panduan tersebut.
          </p>
        </div>
      </div>
    </section>
  );
};

export default GuidenceSection;
