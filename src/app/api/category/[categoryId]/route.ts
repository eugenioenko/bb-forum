import { queryCategory } from "@/queries/server/category.prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { categoryId: string } }
) {
  try {
    const category = await queryCategory(params.categoryId);

    return NextResponse.json({ data: category }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ data: null, error: err }, { status: 404 });
  }
}
