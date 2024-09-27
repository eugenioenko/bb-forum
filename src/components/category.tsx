"use client";

import { Threads } from "./threads";
import { Skeleton } from "./skeleton";
import { Editor } from "./editor";
import { useCategoryQuery } from "@/queries/client/use-category";
interface Props {
  id: string;
}

export const Category = ({ id }: Props) => {
  const { data, loading, error } = useCategoryQuery(id);

  if (loading) {
    return <Skeleton />;
  }

  if (error || !data) {
    return "error";
  }

  console.log(data);

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
          <Threads threads={data.category.threads || []} />
        </div>
      </div>
      <Editor categoryId={data.category.id} />
    </div>
  );
};
