import Image from "next/image";
import Link from "next/link";
import React from "react";

import {
  FacebookLogo,
  InstagramLogo,
  TiktokLogo,
  WhatsappLogo,
  YoutubeLogo,
} from "@phosphor-icons/react/dist/ssr";

export const socials: Record<string, any>[] = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/telagakusuma/",
    icon: InstagramLogo,
  },
  {
    name: "Tiktok",
    url: "https://www.tiktok.com/@telagakusuma",
    icon: TiktokLogo,
  },
  {
    name: "Youtube",
    url: "https://www.youtube.com/channel/UC8Qmz-PB_DeqsCJw6bXfNxA",
    icon: YoutubeLogo,
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/profile.php?id=100087398000356",
    icon: FacebookLogo,
  },
  {
    name: "Whatsapp",
    url: "https://wa.me/message/YVK2R3IRWEMPD1",
    icon: WhatsappLogo,
  },
];

const MainFooter = () => {
  return (
    <footer className="border-t py-4">
      <div className="container space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex gap-3 items-center">
            <Image
              src={"/images/logo-telaga-kusuma.png"}
              alt="logo-telaga-kusuma"
              width={50}
              height={50}
              className="size-8 object-cover"
            />
            <div>
              <p className="text-base md:text-lg font-bold text-primary leading-none">
                Kusuma Bloom
              </p>
              <p className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()}
              </p>
            </div>
          </div>
          <div className="flex gap-2 items-center p-0.5 text-muted-foreground">
            {socials.map((social) => (
              <Link
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noferrer"
                className="hover:text-primary"
                title={social.name}
              >
                {<social.icon size={26} />}
              </Link>
            ))}
          </div>
        </div>
        <div className="text-sm text-center md:text-end">
          Made with ❤️ by{" "}
          <Link
            href={"https://github.com/ArdiantoN19"}
            className="text-primary hover:underline"
          >
            Ardianto
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;
