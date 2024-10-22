import { ProfileSchema } from "@/schemas/profile-schema";
import { authUserOrThrow } from "@/services/auth.service";
import prisma from "@/services/prisma.client";
import { validateSchemaOrThrow } from "@/utils/validate-request";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const req = await request.json();
    const content = validateSchemaOrThrow(ProfileSchema, req);
    const user = authUserOrThrow(request);

    const profile = await prisma.profile.upsert({
      where: {
        userId: user.id,
      },
      create: {
        userId: user.id,
        bio: content.bio,
      },
      update: {
        bio: content.bio,
      },
    });
    return NextResponse.json({ data: profile }, { status: 201 });
  } catch (err: any) {
    const error = "Unexpected error when updating profile";
    return NextResponse.json({ error, data: null }, { status: 409 });
  }
}
