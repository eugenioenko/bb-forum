import { Editor } from "@/components/editor";
import { ServerError } from "@/components/server-error";
import { UpdatePostModel } from "@/queries/server/post.prisma";
import { axiosFetch } from "@/utils/axios-fetch";

interface PageProps {
  params: { postId: string | undefined };
}

export default async function EditorPage({ params }: PageProps) {
  const res = await axiosFetch<UpdatePostModel>(`/api/post/${params.postId}`);

  if (res.error || !res.data) {
    return <ServerError error={res.error} />;
  }

  const { content, title, threadId } = res.data;

  console.log(content);
  return (
    <div className="pt-4">
      <Editor
        postId={params.postId}
        content={content}
        title={title}
        threadId={threadId}
      />
    </div>
  );
}
