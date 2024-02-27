import { getToken } from "next-auth/jwt";
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";
import { startWithRequirePath } from ".";
import { ROLE } from "@/types/authAction";

const authPaths: string[] = ["/register", "/login"];

export const withAuth = (middleware: NextMiddleware, requireAuth: string[]) => {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const { pathname } = req.nextUrl;
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    /**
     * Skenario login
     * login berdasarkan role user
     * - jika role = "REGULAR" maka redirect ke menu /user/dashboard
     * - jika role = "ADMIN" maka redirect ke menu /admin/dashboard
     */

    if (!token && startWithRequirePath(requireAuth, pathname)) {
      const url = new URL("/login", req.url);
      url.searchParams.set("callbackUrl", encodeURI(pathname));
      return NextResponse.redirect(url);
    }

    if (token) {
      const isAdminRole =
        token.role === ROLE.ADMIN &&
        (pathname.startsWith("/user") || authPaths.includes(pathname));
      const isRegularRole =
        token.role === ROLE.REGULAR &&
        (pathname.startsWith("/admin") || authPaths.includes(pathname));

      if (isAdminRole) {
        const url = new URL("/admin/dashboard", req.url);
        return NextResponse.redirect(url);
      }

      if (isRegularRole) {
        const url = new URL("/user/dashboard", req.url);
        return NextResponse.redirect(url);
      }

      return NextResponse.next();
    }

    return middleware(req, next);
  };
};
