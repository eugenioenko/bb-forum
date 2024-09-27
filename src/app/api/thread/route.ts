import { ThreadSchema } from "@/schemas/thread-schema";
import { authUserOrThrow } from "@/services/auth.service";
import prisma from "@/services/prisma.client";
import { validateSchemaOrThrow } from "@/utils/validate-request";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const req = await request.json();
    const content = validateSchemaOrThrow(ThreadSchema, req);
    const user = authUserOrThrow(request);

    const thread = await prisma.thread.create({
      data: {
        title: content.title,
        categoryId: content.categoryId,
        userId: user.id,
      },
    });

    const post = await prisma.post.create({
      data: {
        content: content.content,
        userId: user.id,
        threadId: thread.id,
      },
    });
    return NextResponse.json({ data: post }, { status: 201 });
  } catch (err: any) {
    const error =
      err?.message || err || "Unexpected error when creating a thread";
    return NextResponse.json({ error, data: null }, { status: 409 });
  }
}
