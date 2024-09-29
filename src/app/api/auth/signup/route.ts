import { SignupSchema } from "@/schemas/signup-schema";
import { signupUserOrThrow } from "@/services/auth.service";
import { validateSchemaOrThrow } from "@/utils/validate-request";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const req = await request.json();
    const credentials = validateSchemaOrThrow(SignupSchema, req);
    const authUser = await signupUserOrThrow(credentials);

    return NextResponse.json({ data: authUser }, { status: 200 });
  } catch (err: any) {
    const error = err?.message || "Unexpected login error";
    return NextResponse.json({ error, data: null }, { status: 409 });
  }
}
