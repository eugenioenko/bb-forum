import { refreshUser } from "@/services/auth.service";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const authUser = await refreshUser();

    return NextResponse.json({ data: authUser }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ data: null }, { status: 200 });
  }
}
