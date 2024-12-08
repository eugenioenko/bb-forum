import { Category } from "@/components/category";
import { ServerError } from "@/components/server-error";
import { bbfName } from "@/environment";
import { CategoryModel } from "@/queries/server/category.prisma";
import { axiosFetchCached } from "@/utils/axios-fetch";
import { Metadata } from "next";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
  params: Promise<{ categoryId: string | undefined }>;
}

export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const search = await searchParams;
  const args = await params;
  const res = await axiosFetchCached<CategoryModel>(
    `/api/category/${args.categoryId}?skip=${search.skip || 0}`
  );

  if (res.error) {
    return {
      title: `${bbfName} • Category not found`,
    };
  }

  return {
    title: `${bbfName} • ${res.data.name}`,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: PageProps) {
  const search = await searchParams;
  const args = await params;
  const res = await axiosFetchCached<CategoryModel>(
    `/api/category/${args.categoryId}?skip=${search.skip || 0}`
  );

  if (res.error) {
    return <ServerError error={res.error} />;
  }

  return <Category response={res} />;
}
