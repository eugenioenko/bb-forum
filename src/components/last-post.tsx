import { ThreadModel } from "@/models/api-response";
import { UserLink } from "./user-link";
import { formatDate } from "@/utils/format-date";
import { Thread } from "@/graphql/generated/schema";

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
      <div>todo</div>
      todo
    </div>
  );
};
