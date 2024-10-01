import { PostUser } from "@/queries/server/thread.prisma";
import { UserLink } from "./user-link";
import { formatDate } from "@/utils/format-date";
import { dateFormatter } from "@/utils/date-formatter";

interface Props {
  user: PostUser;
}
export const Author = ({ user }: Props) => {
  const firstLetter = "F";
  const joinedDate = dateFormatter.format(new Date(user.createdAt));

  return (
    <div className="flex flex-row md:flex-col gap-2">
      <div className="w-12 h-12 md:w-32 md:h-32 text-inverse bg-slate-700 rounded-sm flex items-center justify-center text-3xl md:text-7xl">
        {firstLetter}
      </div>
      <div className="flex flex-col">
        <UserLink user={user} />
        <div className="text-sm">Joined: {joinedDate}</div>
      </div>
    </div>
  );
};
