import { GENDER } from "@/lib/actions/userAction/Validator";
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
    gender: GENDER;
    address: string;
    statusMember: string;
    memberUser: Record<string, any>;
  }
}
