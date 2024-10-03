"use client";
import { useCreatePostMutation } from "@/queries/client/use-create-post";
import { useCreateThreadMutation } from "@/queries/client/use-create-thread";
import { EditorSchema, EditorSchemaType } from "@/schemas/editor-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { randParagraph, randPost } from "@ngneat/falso";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "./button";
import { useRouter } from "next/navigation";

interface Props {
  categoryId?: string;
  threadId?: string;
  threadTitle?: string;
}

export const Editor = ({ categoryId, threadId, threadTitle }: Props) => {
  const router = useRouter();
  const editorTitle = categoryId ? "Create new topic" : "Reply to topic";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditorSchemaType>({
    resolver: zodResolver(EditorSchema),
    defaultValues: {
      categoryId,
      threadId,
      content: " ",
      title: threadTitle || " ",
    },
  });

  const {
    mutate: mutateThread,
    isPending: isPendingThread,
    error: errorThread,
  } = useCreateThreadMutation();

  const {
    mutateAsync: mutatePost,
    isPending: isPendingPost,
    error: errorPost,
  } = useCreatePostMutation();

  const doSubmit: SubmitHandler<EditorSchemaType> = async (data) => {
    if (categoryId) {
      mutateThread(
        {
          categoryId: categoryId || "",
          content: randParagraph() || data.content,
          title: randPost().title || data.title || "",
        },
        {
          onSuccess(data) {
            router.push(`/thread/${data.data.threadId}`);
          },
        }
      );
    } else {
      await mutatePost({
        threadId: threadId || "",
        title: data.title,
        content: data.content,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(doSubmit)}
      className="card flex flex-col gap-4 p-4"
    >
      <div className="bg-secondary font-header -mt-4 -mx-4 px-4 py-2 text-inverse">
        {editorTitle}
      </div>
      <div>
        <label>Title</label>
        <input className="w-full" {...register("title")} />
        {errors.title && <span className="error">{errors.title.message}</span>}
      </div>
      <div>
        <label>Content</label>
        <textarea
          className="w-full min-h-32"
          {...register("content")}
        ></textarea>
        {errors.content && (
          <span className="error">{errors.content.message}</span>
        )}
      </div>
      {errorThread && (
        <div className="error text-center">{errorThread.message}</div>
      )}
      {errorPost && (
        <div className="error text-center">{errorPost.message}</div>
      )}
      <div className="flex justify-end">
        <Button type="submit" isLoading={isPendingThread || isPendingPost}>
          Post
        </Button>
      </div>
    </form>
  );
};
