import { CategoryThreadModel } from "@/queries/server/category.prisma";
import { UserLink } from "./user-link";

interface Props {
  thread: Partial<CategoryThreadModel>;
}

export const LastPost = ({ thread }: Props) => {
  if (!thread) {
    return "No posts yet, be the first!";
  }

  return (
    <div>
      <div className="content-ellipsis">{thread.posts?.[0].title}</div>
      <LastPostUser thread={thread} />
    </div>
  );
};

const LastPostUser = ({ thread }: Props) => {
  if (thread?.posts?.length) {
    return (
      <div>
        by <UserLink user={thread.posts[0].user} />
      </div>
    );
  }
  return "";
};
