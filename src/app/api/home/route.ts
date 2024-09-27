import { queryHomePage } from "@/queries/server/home.prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const homePage = await queryHomePage();
  return NextResponse.json({ data: homePage }, { status: 200 });
}
