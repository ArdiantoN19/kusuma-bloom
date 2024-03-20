"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { FunctionComponent, useCallback, useState } from "react";
import { usePathname } from "next/navigation";
import { List, X } from "@phosphor-icons/react";

const MainNav: FunctionComponent = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();
  const [isShowSidebar, setIsShowSidebar] = useState<boolean>(false);
  const onClickSidebarHandler = useCallback(() => {
    setIsShowSidebar((prev) => !prev);
  }, []);

  return (
    <>
      <button
        onClick={onClickSidebarHandler}
        className="block md:hidden font-bold"
      >
        <List size={23} />
      </button>
      <nav
        className={cn(
          "fixed z-50 top-0 md:static flex flex-col md:flex-row md:items-center transition-all md:space-x-4 lg:space-x-6 min-h-screen w-full bg-white md:bg-transparent pt-[4.2em] md:pt-0 gap-y-4 container md:px-0",
          isShowSidebar ? "left-0" : "left-[-100%]",
          className
        )}
        {...props}
      >
        <button
          className="absolute text-muted-foreground top-5 left-7 font-bold md:hidden"
          onClick={onClickSidebarHandler}
        >
          <X size={23} />
        </button>
        <Link
          href="/admin/dashboard"
          onClick={onClickSidebarHandler}
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
          onClick={onClickSidebarHandler}
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
          onClick={onClickSidebarHandler}
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
          onClick={onClickSidebarHandler}
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
          onClick={onClickSidebarHandler}
          className={`text-sm transition-colors hover:text-primary ${
            pathname === "/admin/voucher"
              ? "text-primary font-semibold"
              : "text-muted-foreground font-medium"
          }`}
        >
          Voucher
        </Link>
        <Link
          href="/admin/facility"
          onClick={onClickSidebarHandler}
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
          onClick={onClickSidebarHandler}
          className={`text-sm transition-colors hover:text-primary ${
            pathname === "/admin/scanqrcode"
              ? "text-primary font-semibold"
              : "text-muted-foreground font-medium"
          }`}
        >
          Scan QR Code
        </Link>
      </nav>
    </>
  );
};

export default MainNav;
