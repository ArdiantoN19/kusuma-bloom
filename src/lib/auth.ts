import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import NextAuth, { getServerSession } from "next-auth/next";
import CredentialProvider from "next-auth/providers/credentials";
import { authService } from "./actions/authAction/AuthService";
import bcryptPasswordHash from "@/utils/bcryptPasswordHash";
import { UserType } from "@/types/authAction";
import prisma from "./prisma";
import { Adapter } from "next-auth/adapters";

export const authOptions: NextAuthOptions = {
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
          const user: UserType = await authService.login(email);
          const comparePassword = await bcryptPasswordHash.comparePassword(
            password,
            user.password as string
          );

          if (!comparePassword) {
            throw new Error("Email atau password tidak valid");
          }
          return user;
        }

        return null;
      },
    }),
  ],
  adapter: PrismaAdapter(prisma) as Adapter,
  session: {
    strategy: "jwt",
    maxAge: Number(process.env.NEXTAUTH_MAX_AGE_TOKEN),
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    maxAge: Number(process.env.NEXTAUTH_MAX_AGE_TOKEN),
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ token, session }) {
      if (session.user) {
        if ("role" in token) {
          session.user.role = token.role;
        }
        if ("userId" in token) {
          session.user.userId = token.userId;
        }
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const nextAuth = NextAuth(authOptions);

export const getAuthServerSession = async () => {
  return await getServerSession(authOptions);
};
