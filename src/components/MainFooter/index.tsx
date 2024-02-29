import {
  FacebookLogo,
  InstagramLogo,
  TiktokLogo,
  WhatsappLogo,
  YoutubeLogo,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import React from "react";

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
              <p className="text-lg font-bold text-primary leading-none">
                Kusuma Bloom
              </p>
              <p className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()}
              </p>
            </div>
          </div>
          <div className="flex gap-2 items-center p-0.5 text-muted-foreground">
            <Link
              href={"https://www.instagram.com/telagakusuma"}
              target="_blank"
              rel="noferrer"
              className="hover:text-primary"
              title="Instagram"
            >
              <InstagramLogo size={26} />
            </Link>
            <Link
              href={"https://www.tiktok.com/@telagakusuma"}
              target="_blank"
              rel="noferrer"
              className="hover:text-primary"
              title="Tiktok"
            >
              <TiktokLogo size={26} />
            </Link>
            <Link
              href={"https://www.youtube.com/channel/UC8Qmz-PB_DeqsCJw6bXfNxA"}
              target="_blank"
              rel="noferrer"
              className="hover:text-primary"
              title="Youtube"
            >
              <YoutubeLogo size={26} />
            </Link>
            <Link
              href={"https://www.facebook.com/telaga.kusuma"}
              target="_blank"
              rel="noferrer"
              className="hover:text-primary"
              title="Facebook"
            >
              <FacebookLogo size={26} />
            </Link>
            <Link
              href={"https://wa.me/message/YVK2R3IRWEMPD1"}
              target="_blank"
              rel="noferrer"
              className="hover:text-primary"
              title="Whatsapp"
            >
              <WhatsappLogo size={26} />
            </Link>
          </div>
        </div>
        <div className="text-sm text-end">
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
