"use client";

import { Threads } from "./threads";
import { Editor } from "./editor";
import { CategoryModel } from "@/queries/server/category.prisma";
import { usePrefetchedQuery } from "@/utils/use-prefetched-query";

interface Props {
  category: CategoryModel;
}

export const Category = (props: Props) => {
  const { data: category } = usePrefetchedQuery(
    `/api/category/${props.category.id}`,
    props.category
  );

  return (
    <div className="pt-4 flex flex-col gap-4">
      <div className="card">
        <div className="bg-primary font-header text-white">
          <div className="grid grid-cols-1 md:grid-cols-12 px-2 py-1.5">
            <div className="col-span-7 px-2">Topics</div>
            <div className="hidden md:block col-span-2 text-center px-2">
              Posts
            </div>
            <div className="hidden md:block col-span-2 px-2">Last Post</div>
          </div>
        </div>
        <div>
          <Threads threads={category?.threads || []} />
        </div>
      </div>
      <Editor categoryId={category.id} />
    </div>
  );
};
