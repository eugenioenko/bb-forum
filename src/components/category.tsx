"use client";

import { Threads } from "./threads";
import { Editor } from "./editor";
import { CategoryModel } from "@/queries/server/category.prisma";
import { usePrefetchedQuery } from "@/utils/use-prefetched-query";
import { Pagination } from "./pagination";
import { ApiResponse } from "@/models/api-response";
import { usePageSkip } from "@/hooks/use-page-skip";
import { useCurrentCategory } from "@/hooks/use-current-category";

interface Props {
  response: ApiResponse<CategoryModel>;
}

export const Category = ({ response }: Props) => {
  useCurrentCategory(undefined);
  const { initialData, skip, setSkip } = usePageSkip(response);
  const { data, isLoading } = usePrefetchedQuery(
    `/api/category/${response.data.id}?skip=${skip}`,
    initialData
  );
  const category = data?.data;

  return (
    <div className="pt-4 flex flex-col gap-4">
      <div className="card">
        <div className="bg-secondary font-header text-inverse">
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
      <Pagination
        onSkipChange={(skip) => setSkip(skip)}
        isLoading={isLoading}
        total={category?._count.threads}
        skip={skip}
      />
      <Editor categoryId={category?.id} />
    </div>
  );
};
