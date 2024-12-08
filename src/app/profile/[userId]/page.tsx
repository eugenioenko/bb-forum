import { Profile } from "@/components/profile";
import { ServerError } from "@/components/server-error";
import { ProfileModel } from "@/queries/server/profile.prisma";
import { axiosFetchCached } from "@/utils/axios-fetch";

interface PageProps {
  params: Promise<{ userId: string | undefined }>;
}

export default async function ProfilePage({ params }: PageProps) {
  const args = await params;
  const res = await axiosFetchCached<ProfileModel>(
    `/api/profile/${args.userId}`
  );

  if (res.error) {
    return <ServerError error={res.error} />;
  }

  return <Profile profile={res.data} />;
}
