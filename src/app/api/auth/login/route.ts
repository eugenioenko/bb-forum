import { SignupSchema } from "@/schemas/login-schema";
import { loginUserOrThrow } from "@/services/auth.service";
import { validateSchemaOrThrow } from "@/utils/validate-request";

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const req = await request.json();
    const credentials = validateSchemaOrThrow(SignupSchema, req);
    const authUser = await loginUserOrThrow(credentials);

    return NextResponse.json({ data: authUser }, { status: 200 });
  } catch (err: any) {
    const error = err?.message || "Unexpected login error";
    return NextResponse.json({ error, data: null }, { status: 409 });
  }
}
