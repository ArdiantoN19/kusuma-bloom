import React, { FunctionComponent } from "react";
import {
  At,
  FacebookLogo,
  InstagramLogo,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

interface TeamItemProps {
  [index: string]: any;
}

const TeamItem: FunctionComponent<TeamItemProps> = ({
  name,
  role,
  image,
  social,
}) => {
  return (
    <div className="bg-white w-72 rounded h-[330px] relative group">
      <Image
        src={image}
        width={300}
        height={300}
        alt={name}
        className="w-full h-full rounded object-cover"
      />
      <div className="absolute w-full z-10 top-0 left-0 p-2 hidden animate-fade-in group-hover:block">
        <div className="flex flex-col gap-2 float-end bg-white rounded p-1">
          <Link
            href={social.instagram}
            className="hover:text-primary"
            title="instagram"
          >
            <InstagramLogo size={25} />
          </Link>
          <Link
            href={social.facebook}
            className="hover:text-primary"
            title="facebook"
          >
            <FacebookLogo size={25} />
          </Link>
          <Link
            href={social.email}
            className="hover:text-primary"
            title="email"
          >
            <At size={25} />
          </Link>
        </div>
      </div>
      <div className="w-full h-1/2 rounded absolute z-[1] bg-gradient-to-t from-black to-transparent bottom-0 left-0 "></div>
      <div className="bg-white absolute z-[2] -bottom-5 left-1/2 -translate-x-1/2 p-2 rounded shadow-sm w-3/4">
        <h3 className="text-lg leading-tight font-bold text-center capitalize">
          {name}
        </h3>
        <p className="text-sm text-center text-primary uppercase">({role})</p>
      </div>
    </div>
  );
};

export default TeamItem;
