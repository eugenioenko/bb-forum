"use client";

import { Editor } from "./editor";
import { ThreadModel } from "@/queries/server/thread.prisma";
import { usePrefetchedQuery } from "@/utils/use-prefetched-query";
import { Pagination } from "./pagination";
import { ApiResponse } from "@/models/api-response";
import { usePageSkip } from "@/hooks/use-page-skip";
import { Post } from "./post";
import { useCurrentCategory } from "@/hooks/use-current-category";

interface ThreadProps {
  response: ApiResponse<ThreadModel>;
}

export const Thread = ({ response }: ThreadProps) => {
  const { initialData, skip, setSkip } = usePageSkip(response);
  const { data, isLoading } = usePrefetchedQuery(
    `/api/thread/${response.data.id}?skip=${skip}`,
    initialData
  );
  const thread = data?.data;
  useCurrentCategory(thread?.category);

  return (
    <div className="pt-4 flex flex-col gap-4">
      {thread?.posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      <Pagination
        onSkipChange={(skip) => setSkip(skip)}
        isLoading={isLoading}
        total={thread?._count.posts}
        skip={skip}
      />
      <Editor threadId={thread?.id} title={"Re: " + thread?.posts[0].title} />
    </div>
  );
};
