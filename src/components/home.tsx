"use client";

import { HomeCategory, HomePageModel } from "@/queries/server/home.prisma";
import { useCurrentCategory } from "@/hooks/use-current-category";
import { Statistics } from "./statistics";
import { LastPost } from "./last-post";
import Link from "next/link";

interface HomeProps {
  sections: HomePageModel;
}
export const Home = ({ sections }: HomeProps) => {
  useCurrentCategory(undefined);
  return (
    <div className="pt-4 flex flex-col gap-4">
      {sections.map((section) => (
        <div key={section.id} className="card">
          <div className="bg-secondary font-header text-inverse">
            <div className="grid grid-cols-1 md:grid-cols-12 px-2 py-1.5">
              <div className="col-span-7 px-2">{section?.name}</div>
              <div className="hidden md:block col-span-2 text-center px-2">
                Threads
              </div>
              <div className="hidden md:block col-span-2 px-2">Last Post</div>
            </div>
          </div>
          <div>
            <Categories categories={section.categories} />
          </div>
        </div>
      ))}
      <Statistics />
    </div>
  );
};

interface CategoriesProps {
  categories: HomeCategory[];
}

const Categories = ({ categories }: CategoriesProps) => {
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
