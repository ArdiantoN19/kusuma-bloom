import { ArrowUpRight, MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import React from "react";

const Page = () => {
  return (
    <section className="container mb-28 mt-5 lg:mt-10">
      <div className="flex items-center flex-col md:flex-row justify-between mb-8">
        <div className="mb-5 w-full lg:w-1/2">
          <p className="tracking-wider text-lg md:text-xl text-myOrange mb-2">
            FASILITAS KAMI
          </p>
          <div className="mb-5">
            <h3 className="font-bold text-2xl md:text-3xl text-primary mb-2 ">
              Ayo lihat <span className="text-primary">fasilitas</span> kami
            </h3>
            <div className="w-32">
              <div className="line bg-myOrange"></div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <form action="" className="w-full ">
            <div className="md:float-end flex items-center w-full lg:w-[15rem]">
              <input
                type="text"
                placeholder="Search..."
                className="outline-none rounded-s bg-white border px-4 py-3 text-sm w-full"
                name="search"
              />
              <button
                type="submit"
                className="bg-gradient-primary p-3 rounded-r border border-black btn-shadow"
              >
                <MagnifyingGlass size={20} className="text-white" />
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        <div className="rounded-xl p-3 bg-white border">
          <Image
            src={"/images/about/2.jpg"}
            alt="facility"
            width={300}
            height={300}
            className="w-full h-48 rounded mb-3"
          />
          <h3 className="text-lg font-bold mb-2 truncate">Headline</h3>
          <p className="text-muted text-xs line-clamp-2 mb-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo maxime
            nesciunt illo incidunt voluptatem quasi dicta quibusdam temporibus
            voluptate libero? Fugit voluptate rerum blanditiis iure numquam
            voluptates tempore sapiente fugiat.
          </p>
          <div className="flex justify-end">
            <button className="btn-shadow border border-black bg-gradient-primary text-white px-5 py-1.5 rounded-full flex items-center gap-x-1">
              Detail
              <ArrowUpRight size={16} weight="bold" />
            </button>
          </div>
        </div>
        <div className="rounded-xl p-3 bg-white border">
          <Image
            src={"/images/about/2.jpg"}
            alt="facility"
            width={300}
            height={300}
            className="w-full h-48 rounded mb-3"
          />
          <h3 className="text-lg font-bold mb-2 truncate">Headline</h3>
          <p className="text-muted text-xs line-clamp-2 mb-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo maxime
            nesciunt illo incidunt voluptatem quasi dicta quibusdam temporibus
            voluptate libero? Fugit voluptate rerum blanditiis iure numquam
            voluptates tempore sapiente fugiat.
          </p>
          <div className="flex justify-end">
            <button className="btn-shadow border border-black bg-gradient-primary text-white px-5 py-1.5 rounded-full flex items-center gap-x-1">
              Detail
              <ArrowUpRight size={16} weight="bold" />
            </button>
          </div>
        </div>
        <div className="rounded-xl p-3 bg-white border md:col-span-2 lg:col-auto xl:col-span-2">
          <Image
            src={"/images/about/2.jpg"}
            alt="facility"
            width={300}
            height={300}
            className="w-full h-48 rounded mb-3"
          />
          <h3 className="text-lg font-bold mb-2 truncate">Headline</h3>
          <p className="text-muted text-xs line-clamp-2 mb-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo maxime
            nesciunt illo incidunt voluptatem quasi dicta quibusdam temporibus
            voluptate libero? Fugit voluptate rerum blanditiis iure numquam
            voluptates tempore sapiente fugiat.
          </p>
          <div className="flex justify-end">
            <button className="btn-shadow border border-black bg-gradient-primary text-white px-5 py-1.5 rounded-full flex items-center gap-x-1">
              Detail
              <ArrowUpRight size={16} weight="bold" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
