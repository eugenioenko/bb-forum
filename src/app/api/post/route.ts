import { CreatePostSchema } from "@/schemas/post-schema";
import { authUserOrThrow } from "@/services/auth.service";
import prisma from "@/services/prisma.client";
import { validateSchemaOrThrow } from "@/utils/validate-request";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const req = await request.json();
    const content = validateSchemaOrThrow(CreatePostSchema, req);
    const user = authUserOrThrow(request);

    const post = await prisma.post.create({
      data: {
        title: content.title,
        content: content.content,
        userId: user.id,
        threadId: content.threadId,
      },
    });
    return NextResponse.json({ data: post }, { status: 201 });
  } catch (err: any) {
    const error = err?.message || "Unexpected error when creating a post";
    return NextResponse.json({ error, data: null }, { status: 401 });
  }
}
