import Link from "next/link";

import { cn } from "@/lib/utils";
import { FunctionComponent } from "react";

const MainNav: FunctionComponent = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/admin/dashboard"
        className="text-sm transition-colors hover:text-primary text-primary font-semibold"
      >
        Dashboard
      </Link>
      <Link
        href="/admin/dashboard"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Tiket
      </Link>
      <Link
        href="/admin/dashboard"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        User
      </Link>
      <Link
        href="/admin/dashboard"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Transaksi
      </Link>
      <Link
        href="/admin/dashboard"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Voucher
      </Link>
      <Link
        href="/admin/dashboard"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Panduan
      </Link>
      <Link
        href="/admin/dashboard"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Fasilitas
      </Link>
      <Link
        href="/admin/dashboard"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Scan QR Code
      </Link>
    </nav>
  );
};

export default MainNav;
