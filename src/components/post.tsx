import { ThreadPostModel } from "@/queries/server/thread.prisma";
import { Author } from "./author";
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

interface ContentProps {
  content: string;
}

const Content = ({ content }: ContentProps) => {
  const paragraphs = (content || "").split("\n");
  return (
    <div className="post max-w-[75ch]">
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  );
};

const EditPost = ({ post }: { post: ThreadPostModel }) => {
  const currentUserId = useAuthStore().authUser?.id;
  const isAdmin = useAuthStore().isAdmin;
  const router = useRouter();

  const openEditor = () => {
    router.push(`/editor/${post.id}`);
    router.refresh();
  };

  if (isAdmin || (currentUserId && currentUserId === post.user.id)) {
    return (
      <div className="flex flex-row justify-end gap-2">
        <Button isIcon onClick={() => openEditor()}>
          <IconEdit size={20} />
        </Button>
      </div>
    );
  }
};
