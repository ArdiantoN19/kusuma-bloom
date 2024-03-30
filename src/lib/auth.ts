import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import NextAuth, { getServerSession } from "next-auth/next";
import CredentialProvider from "next-auth/providers/credentials";
import { authService } from "./actions/authAction/AuthService";
import bcryptPasswordHash from "@/utils/bcryptPasswordHash";
import { UserType } from "@/types/authAction";
import prisma from "./prisma";
import { Adapter } from "next-auth/adapters";
import { verifyTokenService } from "./actions/authAction/VerifyTokenService";
import { memberUserService } from "./actions/memberUserAction/MemberUserService";

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
          const responseToken = await verifyTokenService.getTokenByEmail(email);
          const memberUser = await memberUserService.getMemberUserById(user.id);
          const comparePassword = await bcryptPasswordHash.comparePassword(
            password,
            user.password as string
          );

          if (!comparePassword) {
            throw new Error("Email atau password tidak valid");
          }

          if (!user.emailVerified) {
            throw new Error(
              `Verifikasi email Anda terlebih dahulu!${
                responseToken.token ?? "0"
              }`
            );
          }

          if (memberUser && !memberUser.verifiedAt) {
            return { statusMember: "pending", memberUser, ...user };
          }

          if (memberUser && memberUser.verifiedAt) {
            return { statusMember: "success", memberUser, ...user };
          }

          return { statusMember: "fail", memberUser, ...user };
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
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.userId = user.id;
        token.role = user.role;
        token.gender = user.gender;
        token.address = user.address;
        token.isPopMember = 1;
        token.statusMember = user.statusMember;
        token.memberUser = user.memberUser;
      }
      if (trigger === "update") {
        if (session.info.image) {
          token.picture = session.info.image;
        }
        if (session.info.email || session.info.address) {
          token.email = session.info.email;
          token.address = session.info.address;
        }
        if (session.info.isPopMember === 0) {
          token.isPopMember = 0;
        }
        if (session.info.isPopMember === 1) {
          token.isPopMember = 1;
        }
        if (session.info.statusMember) {
          token.statusMember = session.info.statusMember;
        }
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
        if ("gender" in token) {
          session.user.gender = token.gender;
        }
        if ("address" in token) {
          session.user.address = token.address;
        }
        if ("isPopMember" in token) {
          session.user.isPopMember = token.isPopMember;
        }
        if ("statusMember" in token) {
          session.user.statusMember = token.statusMember;
        }
        if ("memberUser" in token) {
          session.user.memberUser = token.memberUser;
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
