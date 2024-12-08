import { Editor } from "@/components/editor";
import { ServerError } from "@/components/server-error";
import { bbfName } from "@/environment";
import { UpdatePostModel } from "@/queries/server/post.prisma";
import { axiosFetchCached } from "@/utils/axios-fetch";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ postId: string | undefined }>;
}
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const args = await params;
  const res = await axiosFetchCached<UpdatePostModel>(
    `/api/post/${args.postId}`
  );

  if (res.error) {
    return {
      title: `${bbfName} • Editing post`,
    };
  }

  return {
    title: `${bbfName} • Edit • ${res.data.title}`,
  };
}

export default async function EditorPage({ params }: PageProps) {
  const args = await params;
  const res = await axiosFetchCached<UpdatePostModel>(
    `/api/post/${args.postId}`
  );

  if (res.error || !res.data) {
    return <ServerError error={res.error} />;
  }

  const { content, title, threadId } = res.data;

  return (
    <div className="pt-4">
      <Editor
        postId={args.postId}
        content={content}
        title={title}
        threadId={threadId}
      />
    </div>
  );
}
