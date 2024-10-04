import { NextResponse, type NextRequest } from "next/server";
import { Exceptions, panic } from "./models/http-exception";

export const config = {
  matcher: ["/api/thread/:path", "/api/post/:path"],
};

export function middleware(request: NextRequest) {
  const authorization = request.headers.get("authorization");
  if (!authorization) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }
}
