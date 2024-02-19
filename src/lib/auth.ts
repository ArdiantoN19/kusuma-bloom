import { NextAuthOptions } from "next-auth";
import NextAuth, { getServerSession } from "next-auth/next";
import CredentialProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  jwt: {
    maxAge: 24 * 60 * 60,
  },
  providers: [
    CredentialProvider({
      name: "Credentials",
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req): Promise<any> {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        if (email && password) {
          return { email, password, id: 1, image: "dsajndk" };
        }

        return null;
      },
    }),
  ],
};

export const nextAuth = NextAuth(authOptions);

export const getAuthServerSession = () => getServerSession(authOptions);
