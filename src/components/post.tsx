import { ThreadPostModel } from "@/queries/server/thread.prisma";
import { Author } from "./author";
import { Content } from "./content";
import { longDateFormatter } from "@/utils/date-formatter";

interface PostProps {
  post: ThreadPostModel;
}

export const Post = ({ post }: PostProps) => {
  const postDate = longDateFormatter.format(new Date(post.createdAt));
  return (
    <div className="card">
      <div className="bg-secondary text-inverse">
        <div className="px-4 py-2 grid grid-cols-1 md:grid-cols-6">
          <div className="flex-grow content-ellipsis col-span-4">
            {post.title}
          </div>
          <div className="md:text-right col-span-2">{postDate}</div>
        </div>
      </div>
      <div className="flex flex-col-reverse md:flex-row">
        <div className="flex-grow px-4 py-2">
          <Content content={post.content} />
        </div>
        <div className="px-4 py-2 lg:min-w-48 border-b border-muted md:border-l md:border-b-0">
          <Author user={post.user} />
        </div>
      </div>
    </div>
  );
};
