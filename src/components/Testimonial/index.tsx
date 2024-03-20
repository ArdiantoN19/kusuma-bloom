import { TestimonialType } from "@/types/utils-data";
import { dateFormatter } from "@/utils";
import { testimonials } from "@/utils/data";
import { Star } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import React from "react";

const StarElement = ({ rating }: { rating: number }) => {
  const stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(
      <Star key={i} size={20} weight="fill" className="text-myOrange" />
    );
  }
  return stars;
};

const TestimonialSection = () => {
  return (
    <section className="bg-gradient-primary py-12">
      <div className="container">
        <div className="mb-10 md:mb-16">
          <p className="tracking-wider text-lg text-center md:text-xl text-white mb-2">
            TESTIMONIALS
          </p>
          <h3 className="text-center font-bold text-2xl md:text-3xl text-white mb-2 ">
            <span className="text-myOrange">Review</span> Pengguna
          </h3>
          <p className="text-sm text-center text-white mb-4">
            Beberapa testimoni terbaik dari beberapa pengguna
          </p>
          <div className="w-32 mx-auto">
            <div className="line bg-myOrange"></div>
          </div>
        </div>
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
          {testimonials.map((testimoni: TestimonialType) => (
            <div
              key={testimoni.id}
              className="border  bg-white rounded p-5 md:last:hidden lg:last:block"
            >
              <div className="flex items-center gap-x-1 mb-2">
                <StarElement rating={testimoni.rating} />
              </div>
              <h3 className="font-bold text-xl mb-2 truncate">
                {testimoni.title}
              </h3>
              <p className="text-xs text-muted mb-3">
                {dateFormatter(testimoni.createdAt)}
              </p>
              <p className="text-xs text-muted text-justify line-clamp-3 mb-5">
                {testimoni.testimoni}
              </p>
              <div className="flex items-center gap-x-2">
                <Image
                  src={"/images/avatar/default.jpg"}
                  alt="default-avatar"
                  width={32}
                  height={32}
                  className="rounded-full w-8 h-8"
                />
                <div>
                  <p className="text-sm text-primary">{testimoni.username}</p>
                  <p className="text-xs text-muted">({testimoni.role})</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
