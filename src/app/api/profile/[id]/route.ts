import { queryProfile } from "@/queries/server/profile.prisma";
import { IdSchema } from "@/schemas/id-schema";
import { validateSchemaOrThrow } from "@/utils/validate-request";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const args = await params;
    const userId = validateSchemaOrThrow(IdSchema, args).id;
    const profile = await queryProfile(userId);

    return NextResponse.json({ data: profile }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { data: null, error: "Profile not found" },
      { status: 404 }
    );
  }
}
