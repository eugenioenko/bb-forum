import { UpdatePostSchema } from "@/schemas/post-schema";
import { authUserOrThrow } from "@/services/auth.service";
import prisma from "@/services/prisma.client";
import { validateSchemaOrThrow } from "@/utils/validate-request";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const req = await request.json();
    const content = validateSchemaOrThrow(UpdatePostSchema, req);
    const user = authUserOrThrow(request);

    const post = await prisma.post.findUniqueOrThrow({
      where: {
        id: content.postId,
      },
    });

    if (post.userId !== user.id) {
      const admin = await prisma.user.findUniqueOrThrow({
        where: {
          id: user.id,
        },
        include: {
          userRoles: true,
        },
      });
      const hasAdminRole = admin.userRoles.find((role) =>
        ["admin", "mod"].includes(role.roleId)
      );
      if (!hasAdminRole) {
        throw "User not allowed to update post";
      }
    }

    const updated = await prisma.post.update({
      data: { title: content.title, content: content.content },
      where: { id: content.postId },
    });

    return NextResponse.json({ data: updated }, { status: 200 });
  } catch (err: any) {
    const error = "Unexpected error when updating a post";
    return NextResponse.json({ error, data: null }, { status: 409 });
  }
}
