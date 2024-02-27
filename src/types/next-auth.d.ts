import NextAuth, { DefaultSession } from "next-auth/next";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session extends DefaultSession {
    user: DefaultSession["user"];
  }
  interface User extends DefaultSession["user"] {
    role: string;
  }
}
