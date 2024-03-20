"use client";

import React, { FunctionComponent, ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import CTA from "@/components/CTA";
import { startWithRequirePath } from "@/utils";

interface NextAuthProviderProps {
  children: ReactNode;
}

const NextAuthProvider: FunctionComponent<NextAuthProviderProps> = ({
  children,
}) => {
  const pathname = usePathname();

  return (
    <SessionProvider>
      {children}
      {!startWithRequirePath(["/user/**", "/admin/**"], pathname) && <CTA />}
    </SessionProvider>
  );
};

export default NextAuthProvider;
