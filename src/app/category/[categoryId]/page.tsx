import { Category } from "@/components/category";
import { Home } from "@/components/home";
import { ServerError } from "@/components/server-error";
import { queryCategory } from "@/queries/server/category.prisma";

export default async function CategoryPage({
  params,
}: {
  params: { categoryId: string };
}) {
  try {
    const category = await queryCategory(params.categoryId);
    return <Category category={category} />;
  } catch (e) {
    return <ServerError error={e} />;
  }
}
