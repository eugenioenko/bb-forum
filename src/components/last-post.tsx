import { Thread } from "@prisma/client";

interface Props {
  thread: Partial<Thread>;
  showDate?: boolean;
}

export const LastPost = ({ thread, showDate }: Props) => {
  if (!thread) {
    return "No posts yet, be the first!";
  }
  return (
    <div>
      <div className="text-nowrap text-ellipsis overflow-hidden">
        {thread.title}
      </div>
    </div>
  );
};
