import { queryCategory } from "@/queries/server/category.prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { categoryId: string } }
) {
  try {
    const skip = Number(request.nextUrl.searchParams.get("skip")) || 0;
    const category = await queryCategory(params.categoryId, { skip });
    return NextResponse.json({ data: category, skip }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { data: null, error: "Category not found" },
      { status: 200 }
    );
  }
}
