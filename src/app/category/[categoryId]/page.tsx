import { Category } from "@/components/category";
import { Home } from "@/components/home";

export default function CategoryPage({
  params,
}: {
  params: { categoryId: string };
}) {
  return <Category id={params.categoryId} />;
}
