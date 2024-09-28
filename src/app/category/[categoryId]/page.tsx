import { Category } from "@/components/category";
import { ServerError } from "@/components/server-error";
import { CategoryModel } from "@/queries/server/category.prisma";
import { axiosFetch } from "@/utils/axios-fetch";

interface PageProps {
  searchParams: { [key: string]: string | undefined };
  params: { categoryId: string | undefined };
}

export default async function CategoryPage({
  params,
  searchParams,
}: PageProps) {
  const res = await axiosFetch<CategoryModel>(
    `/api/category/${params.categoryId}?skip=${searchParams.skip}`
  );

  if (res.error) {
    return <ServerError error={res.error} />;
  } else if (res.data) {
    return <Category response={res} />;
  } else {
    return <ServerError error="Unexpected Error" />;
  }
}
