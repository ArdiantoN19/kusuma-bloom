"use client";

import React, { FunctionComponent, ReactNode } from "react";
import { startWithRequirePath } from "@/utils";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface UserLayoutProps {
  children: Readonly<ReactNode>;
}

const UserLayout: FunctionComponent<UserLayoutProps> = ({ children }) => {
  const pathname = usePathname();

  return (
    <>
      {!startWithRequirePath(["/user/**"], pathname) && <Navbar />}
      {children}
      {!startWithRequirePath(["/user/**"], pathname) && <Footer />}
    </>
  );
};

export default UserLayout;
