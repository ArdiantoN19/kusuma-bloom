import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "./utils/withAuth";

const mainMiddleware = async (req: NextRequest) => {
  return NextResponse.next();
};

const requireAuth: string[] = ["/user/**", "/admin/**", "/api/v1/**"];

export default withAuth(mainMiddleware, requireAuth);
