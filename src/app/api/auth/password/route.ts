import { ChangePasswordSchema } from "@/schemas/change-pwd.schema";
import {
  authUserOrThrow,
  changePasswordOrThrow,
} from "@/services/auth.service";
import { validateSchemaOrThrow } from "@/utils/validate-request";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const req = await request.json();
    const credentials = validateSchemaOrThrow(ChangePasswordSchema, req);
    const user = authUserOrThrow(request);

    const result = await changePasswordOrThrow(user.id, credentials);
    return NextResponse.json({ data: { success: result } }, { status: 200 });
  } catch (err: any) {
    const error = err.message || "Unexpected error when updating password";
    return NextResponse.json({ error, data: null }, { status: 409 });
  }
}
