"use client";

import { SessionProvider } from "next-auth/react";
import React, { FunctionComponent, ReactNode } from "react";

interface NextAuthProviderProps {
  children: ReactNode;
}

const NextAuthProvider: FunctionComponent<NextAuthProviderProps> = ({
  children,
}) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default NextAuthProvider;
