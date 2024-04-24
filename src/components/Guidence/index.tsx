import Image from "next/image";
import React, { FunctionComponent } from "react";
import imagePanduan from "../../../public/images/Panduan Kusuma Bloom.png";

const GuidenceSection: FunctionComponent = () => {
  return (
    <section className="pt-14 pb-10 container flex items-center flex-col md:flex-row gap-2 md:gap-x-8">
      <div className="w-full md:w-1/2">
        <Image
          className="aspect-video w-full rounded border bg-white"
          src={imagePanduan}
          alt="Panduan Kusuma Bloom"
          width={300}
          height={300}
          priority
          quality={100}
          placeholder="blur"
          sizes="100vw"
        />
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
            panduan penggunaan website telah hadir dalam bentuk gambar yang
            dapat menjelaskan secara jelas bagaimana cara menggunakan website
            Kusuma Bloom
          </p>
          <p>
            Panduan ini akan menjelaskan cara melakukan transaksi tiket dari
            awal hingga akhir. Untuk mempermudah pengguna dalam memahami proses
            transaksi tiket yang terjadi
          </p>
        </div>
      </div>
    </section>
  );
};

export default GuidenceSection;
