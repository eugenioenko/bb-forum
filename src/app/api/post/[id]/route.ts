import { queryPost } from "@/queries/server/post.prisma";
import { IdSchema } from "@/schemas/id-schema";
import { validateSchemaOrThrow } from "@/utils/validate-request";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const args = await params;
    const postId = validateSchemaOrThrow(IdSchema, args).id;
    const post = await queryPost(postId);
    return NextResponse.json({ data: post }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { data: null, error: "Post not found" },
      { status: 404 }
    );
  }
}
