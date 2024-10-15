import { ThreadPostModel } from "@/queries/server/thread.prisma";
import { Author } from "./author";
import { Content } from "./content";
import { longDateFormatter } from "@/utils/date-formatter";
import { Button } from "./button";
import { IconEdit } from "@tabler/icons-react";
import { useAuthStore } from "@/stores/auth.store";
import { useRouter } from "next/navigation";

interface PostProps {
  post: ThreadPostModel;
}

export const Post = ({ post }: PostProps) => {
  const postDate = longDateFormatter.format(new Date(post.createdAt));

  return (
    <div className="card">
      <div className="bg-secondary text-inverse">
        <div className="px-4 py-2 grid grid-cols-1 md:grid-cols-6 items-center">
          <div className="flex-grow content-ellipsis col-span-4">
            {post.title}
          </div>
          <div className="md:text-right col-span-2 text-sm">{postDate}</div>
        </div>
      </div>
      <div className="flex flex-col-reverse md:flex-row">
        <div className="flex-grow px-4 py-2 flex flex-col justify-between gap-2">
          <Content content={post.content} />
          <EditPost post={post} />
        </div>
        <div className="px-4 py-2 border-b border-muted md:border-l md:border-b-0">
          <Author user={post.user} />
        </div>
      </div>
    </div>
  );
};

const EditPost = ({ post }: { post: ThreadPostModel }) => {
  const currentUserId = useAuthStore().authUser?.id;
  const router = useRouter();

  if (currentUserId && currentUserId === post.user.id) {
    return (
      <div className="flex flex-row justify-end gap-2">
        <Button isIcon onClick={() => router.push(`/editor/${post.id}`)}>
          <IconEdit size={20} />
        </Button>
      </div>
    );
  }
};
