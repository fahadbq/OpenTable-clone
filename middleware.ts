import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest, res: NextResponse) {
  console.log("Hahah");
}

export const config = {
  matcher: ["/api/auth/me"],
};
