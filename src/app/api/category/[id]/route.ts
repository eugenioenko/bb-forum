import { queryCategory } from "@/queries/server/category.prisma";
import { IdSchema } from "@/schemas/id-schema";
import { positiveIntegerOrZero } from "@/utils/number-or-zero";
import { validateSchemaOrThrow } from "@/utils/validate-request";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const categoryId = validateSchemaOrThrow(IdSchema, params).id;
    const querySkip = request.nextUrl.searchParams.get("skip");
    const skip = positiveIntegerOrZero(querySkip);
    const category = await queryCategory(categoryId, { skip });

    return NextResponse.json(
      { data: category, args: { skip } },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { data: null, error: "Category not found" },
      { status: 404 }
    );
  }
}
