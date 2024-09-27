import { logoutUser } from "@/services/auth.service";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await logoutUser();

    return NextResponse.json({ data: true }, { status: 200 });
  } catch (err: any) {
    const error = err?.message || "Unexpected login error";
    return NextResponse.json({ error, data: null }, { status: 409 });
  }
}
