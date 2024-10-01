import Link from "next/link";
import { NoResults } from "./no-results";
import { CategoryModel } from "@/queries/server/category.prisma";
import { LastPost } from "./last-post";

interface Props {
  threads?: CategoryModel["threads"];
}

export const Threads = ({ threads }: Props) => {
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
          <Link href={`/thread/${thread.id}`}>{thread.title}</Link>
        </div>
        <div className="text-nowrap text-ellipsis overflow-hidden">
          {thread.posts[0].content}
        </div>
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
