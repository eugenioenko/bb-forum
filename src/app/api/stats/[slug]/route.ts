import prisma from "@/services/prisma.client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const posts = await prisma.post.count();
    const threads = await prisma.thread.count();
    const users = await prisma.user.count();
    const lastUser = await prisma.user.findFirst({
      select: {
        id: true,
        username: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const data = { posts, threads, users, lastUser, slug: params.slug };
    return NextResponse.json({ data }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { data: null, error: "Stats not found" },
      { status: 404 }
    );
  }
}
