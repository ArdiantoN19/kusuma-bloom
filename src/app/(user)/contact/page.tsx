import { At, MapPin, Phone } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import React from "react";

const Page = () => {
  return (
    <section className="mb-28 mt-5">
      <div className="container flex items-start flex-col-reverse lg:flex-row gap-x-10">
        <div className="mb-5 w-full lg:w-1/2">
          <p className="tracking-wider text-lg md:text-xl text-myOrange mb-2">
            KONTAK KAMI
          </p>
          <div className="mb-5">
            <h3 className="font-bold text-2xl md:text-3xl text-primary mb-2 ">
              Hubungi <span className="text-primary">Kontak</span> Kusuma Bloom
            </h3>
            <div className="w-32">
              <div className="line bg-myOrange"></div>
            </div>
          </div>
          <p className="text-base text-justify mb-8">
            Harap hubungi kontak di bawah ini jika Anda memiliki pertanyaan
            terkait Kusuma Bloom. Dengan segenap hati kami akan segera menjawab
            pertanyaan Anda
          </p>
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-5">
              <MapPin
                size={44}
                weight="fill"
                className="text-white bg-gradient-primary p-2 rounded"
              />
              <div>
                <h2 className="font-bold text-primary mb-1">Alamat Lokasi</h2>
                <p className="text-sm">
                  Tawun, Tunggulrejo, Jumantono, Karanganyar (57782)
                </p>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <At
                size={44}
                weight="fill"
                className="text-white bg-gradient-primary p-2 rounded"
              />
              <div>
                <h2 className="font-bold text-primary mb-1">Email</h2>
                <p className="text-sm">KusumaBloom@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <Phone
                size={44}
                weight="fill"
                className="text-white bg-gradient-primary p-2 rounded"
              />
              <div>
                <h2 className="font-bold text-primary mb-1">Telepon</h2>
                <p className="text-sm">+(0271) 1987 123 88</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <Image
            src={"/images/woman-take-picture.png"}
            alt="person telphone"
            width={300}
            height={300}
            className="w-full h-auto lg:size-[32rem] float-end"
          />
        </div>
      </div>
    </section>
  );
};

export default Page;
