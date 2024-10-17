import { ProfileModel } from "@/queries/server/profile.prisma";
import { Avatar } from "./author";
import { dateDiffInDays } from "@/utils/date-diff-in-days";

interface ProfileProps {
  profile: ProfileModel;
}

export const Profile = ({ profile }: ProfileProps) => {
  const posts = profile._count.posts;
  const threads = profile._count.threads;
  const days = dateDiffInDays(new Date(profile.createdAt), new Date());

  return (
    <div className="pt-4 flex flex-col gap-4">
      <div className="card">
        <div className="bg-secondary font-header text-inverse px-4 py-1.5">
          Profile
        </div>
        <div className="p-4 flex flex-col items-center gap-4">
          <Avatar username="John Doe" />
          <div className="text-xl md:text-3xl font-semibold">
            {profile.username}
          </div>
          <div className="max-w-lg text-normal">{profile.profile?.bio}</div>
          <div>
            <b>{posts}</b> Posts | <b>{threads}</b> Topics | <b>{days}</b> days
          </div>
        </div>
      </div>
    </div>
  );
};
