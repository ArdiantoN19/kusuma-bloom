"use client";

import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import React, { FunctionComponent, ReactNode } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";

interface NextAuthProviderProps {
  children: ReactNode;
}

const authPaths = ["/login", "/register"];

const NextAuthProvider: FunctionComponent<NextAuthProviderProps> = ({
  children,
}) => {
  const pathname = usePathname();

  return (
    <SessionProvider>
      {!authPaths.includes(pathname) && <Navbar />}
      {children}
      {!authPaths.includes(pathname) && <Footer />}
    </SessionProvider>
  );
};

export default NextAuthProvider;
