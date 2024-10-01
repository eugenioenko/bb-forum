import { ThreadPostModel } from "@/queries/server/thread.prisma";
import { Author } from "./author";
import { Content } from "./content";

interface PostProps {
  title: string;
  post: ThreadPostModel;
}

export const Post = ({ post, title }: PostProps) => {
  console.log(new Intl.DateTimeFormat().format(new Date()));
  return (
    <div className="card">
      <div className="bg-secondary font-header text-inverse">
        <div className="px-4 py-2">{title}</div>
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
