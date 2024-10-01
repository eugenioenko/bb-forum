import { ServerError } from "@/components/server-error";
import { Thread } from "@/components/thread";
import { ThreadModel } from "@/queries/server/thread.prisma";
import { axiosFetch } from "@/utils/axios-fetch";

interface PageProps {
  searchParams: { [key: string]: string | undefined };
  params: { threadId: string | undefined };
}

export default async function ThreadPage({ params, searchParams }: PageProps) {
  const res = await axiosFetch<ThreadModel>(
    `/api/thread/${params.threadId}?skip=${searchParams.skip}`
  );

  if (res.error) {
    return <ServerError error={res.error} />;
  }

  return <Thread response={res} />;
}
