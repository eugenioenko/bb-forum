import { PostUser } from "@/queries/server/thread.prisma";
import { UserLink } from "./user-link";
import { dateFormatter } from "@/utils/date-formatter";
import { usernameToColor } from "@/utils/username-to-color";

interface Props {
  user: PostUser;
}

export const Author = ({ user }: Props) => {
  const joinedDate = dateFormatter.format(new Date(user.createdAt));

  return (
    <div className="flex flex-row md:flex-col gap-2">
      <Avatar username={user.username} />
      <div className="flex flex-col">
        <UserLink user={user} />
        <div className="text-sm">Joined: {joinedDate}</div>
      </div>
    </div>
  );
};

export const Avatar = ({ username }: { username: string }) => {
  const background = usernameToColor(username);
  const firstLetter = username[0];
  return (
    <div
      className="w-12 h-12 md:w-32 md:h-32 text-inverse rounded flex items-center justify-center text-3xl md:text-7xl font-bold"
      style={{ background }}
    >
      {firstLetter}
    </div>
  );
};
