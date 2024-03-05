"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { FunctionComponent } from "react";
import { usePathname } from "next/navigation";

const MainNav: FunctionComponent = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/admin/dashboard"
        className={`text-sm transition-colors hover:text-primary ${
          pathname === "/admin/dashboard"
            ? "text-primary font-semibold"
            : "text-muted-foreground font-medium"
        }`}
      >
        Dashboard
      </Link>
      <Link
        href="/admin/ticket"
        className={`text-sm transition-colors hover:text-primary ${
          pathname === "/admin/ticket"
            ? "text-primary font-semibold"
            : "text-muted-foreground font-medium"
        }`}
      >
        Tiket
      </Link>
      <Link
        href="/admin/user"
        className={`text-sm transition-colors hover:text-primary ${
          pathname === "/admin/user"
            ? "text-primary font-semibold"
            : "text-muted-foreground font-medium"
        }`}
      >
        User
      </Link>
      <Link
        href="/admin/transaction"
        className={`text-sm transition-colors hover:text-primary ${
          pathname === "/admin/transaction"
            ? "text-primary font-semibold"
            : "text-muted-foreground font-medium"
        }`}
      >
        Transaksi
      </Link>
      <Link
        href="/admin/voucher"
        className={`text-sm transition-colors hover:text-primary ${
          pathname === "/admin/voucher"
            ? "text-primary font-semibold"
            : "text-muted-foreground font-medium"
        }`}
      >
        Voucher
      </Link>
      <Link
        href="/admin/guidence"
        className={`text-sm transition-colors hover:text-primary ${
          pathname === "/admin/guidence"
            ? "text-primary font-semibold"
            : "text-muted-foreground font-medium"
        }`}
      >
        Panduan
      </Link>
      <Link
        href="/admin/facility"
        className={`text-sm transition-colors hover:text-primary ${
          pathname === "/admin/facility"
            ? "text-primary font-semibold"
            : "text-muted-foreground font-medium"
        }`}
      >
        Fasilitas
      </Link>
      <Link
        href="/admin/scanqrcode"
        className={`text-sm transition-colors hover:text-primary ${
          pathname === "/admin/scanqrcode"
            ? "text-primary font-semibold"
            : "text-muted-foreground font-medium"
        }`}
      >
        Scan QR Code
      </Link>
    </nav>
  );
};

export default MainNav;
