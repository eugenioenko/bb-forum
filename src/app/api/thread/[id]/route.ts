import { queryThread } from "@/queries/server/thread.prisma";
import { IdSchema } from "@/schemas/id-schema";
import { positiveIntegerOrZero } from "@/utils/number-or-zero";
import { validateSchemaOrThrow } from "@/utils/validate-request";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const args = await params;
    const threadId = validateSchemaOrThrow(IdSchema, args).id;
    const querySkip = request.nextUrl.searchParams.get("skip");
    const skip = positiveIntegerOrZero(querySkip);
    const thread = await queryThread(threadId, { skip });

    return NextResponse.json({ data: thread, args: { skip } }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { data: null, error: "Thread not found" },
      { status: 404 }
    );
  }
}
