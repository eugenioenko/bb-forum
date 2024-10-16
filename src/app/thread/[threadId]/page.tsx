import { ServerError } from "@/components/server-error";
import { Thread } from "@/components/thread";
import { bbfName } from "@/environment";
import { ThreadModel } from "@/queries/server/thread.prisma";
import { axiosFetchCached } from "@/utils/axios-fetch";
import { Metadata } from "next";

interface PageProps {
  searchParams: { [key: string]: string | undefined };
  params: { threadId: string | undefined };
}

export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const res = await axiosFetchCached<ThreadModel>(
    `/api/thread/${params.threadId}?skip=${searchParams.skip || 0}`
  );

  if (res.error) {
    return {
      title: `${bbfName} • Topic not found`,
    };
  }

  return {
    title: `${bbfName} • ${res.data.posts?.[0]?.title}`,
  };
}

export default async function ThreadPage({ params, searchParams }: PageProps) {
  const res = await axiosFetchCached<ThreadModel>(
    `/api/thread/${params.threadId}?skip=${searchParams.skip || 0}`
  );

  if (res.error) {
    return <ServerError error={res.error} />;
  }

  return <Thread response={res} />;
}
