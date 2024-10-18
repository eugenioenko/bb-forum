"use client";

import { useCurrentCategory } from "@/hooks/use-current-category";
import { usePageSkip } from "@/hooks/use-page-skip";
import { ApiResponse } from "@/models/api-response";
import {
  CategoryModel,
  CategoryThreadModel,
} from "@/queries/server/category.prisma";
import { usePrefetchedQuery } from "@/utils/use-prefetched-query";
import Link from "next/link";
import { Editor } from "./editor";
import { LastPost } from "./last-post";
import { NoResults } from "./no-results";
import { Pagination } from "./pagination";

interface CategoryProps {
  response: ApiResponse<CategoryModel>;
}

export const Category = ({ response }: CategoryProps) => {
  const { initialData, skip, setSkip } = usePageSkip(response);
  const { data, isLoading } = usePrefetchedQuery(
    `/api/category/${response.data.id}?skip=${skip}`,
    initialData
  );
  const category = data?.data;
  useCurrentCategory(category);

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

interface ThreadsProps {
  threads?: CategoryThreadModel[];
}

const Threads = ({ threads }: ThreadsProps) => {
  if (!threads?.length) {
    return <NoResults />;
  }

  return threads.map((thread) => (
    <div
      className="grid grid-cols-1 md:grid-cols-12 border-b border-muted px-2 py-1.5 items-center last:border-none"
      key={thread.id}
    >
      <div className="col-span-7 px-2">
        <div className="text-primary">
          <Link href={`/thread/${thread.id}`}>{thread.posts[0].title}</Link>
        </div>
        <div className="content-ellipsis">{thread.posts[0].content}</div>
      </div>
      <div className="hidden md:block col-span-2 text-center px-2 ">
        {thread._count.posts}
      </div>
      <div className="hidden md:block col-span-3 px-2">
        <LastPost thread={thread} />
      </div>
    </div>
  ));
};
