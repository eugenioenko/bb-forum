import { Category } from "@/components/category";
import { ServerError } from "@/components/server-error";
import { bbfName } from "@/environment";
import { CategoryModel } from "@/queries/server/category.prisma";
import { axiosFetchCached } from "@/utils/axios-fetch";
import { Metadata } from "next";

interface PageProps {
  searchParams: { [key: string]: string | undefined };
  params: { categoryId: string | undefined };
}

export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const res = await axiosFetchCached<CategoryModel>(
    `/api/category/${params.categoryId}?skip=${searchParams.skip || 0}`
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
  const res = await axiosFetchCached<CategoryModel>(
    `/api/category/${params.categoryId}?skip=${searchParams.skip || 0}`
  );

  if (res.error) {
    return <ServerError error={res.error} />;
  }

  return <Category response={res} />;
}
