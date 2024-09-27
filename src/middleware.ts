import { NextResponse, type NextRequest } from "next/server";

export const config = {
  matcher: "/api/thread/:path",
};

export function middleware(request: NextRequest) {
  const authorization = request.headers.get("authorization");
  if (!authorization) {
    return NextResponse.json(
      { error: "Authentication required", data: null },
      { status: 401 }
    );
  }
}
