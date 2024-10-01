import Link from "next/link";
import { LastPost } from "./last-post";

interface Props {
  categories: any[];
}

export const Categories = ({ categories }: Props) => {
  return categories.map((category) => (
    <div
      className="grid grid-cols-1 md:grid-cols-12 border-b border-muted px-2 py-1.5 items-center last:border-none"
      key={category.id}
    >
      <div className="col-span-7 px-2">
        <div className="text-primary">
          <Link href={`/category/${category.id}`}>{category.name}</Link>
        </div>
        <div>{category.description}</div>
      </div>
      <div className="hidden md:block col-span-2 text-center px-2 ">
        {category._count.threads}
      </div>
      <div className="hidden md:block col-span-3 px-2">
        {category._count.threads ? (
          <LastPost thread={category.threads[0]} />
        ) : (
          "No posts yet, be the first!"
        )}
      </div>
    </div>
  ));
};
