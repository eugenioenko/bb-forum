"use client";
import { useCreatePostMutation } from "@/queries/client/use-create-post";
import { useCreateThreadMutation } from "@/queries/client/use-create-thread";
import { EditorSchema, EditorSchemaType } from "@/schemas/editor-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "./button";
import { randParagraph, randPost } from "@ngneat/falso";

interface Props {
  categoryId?: string;
  threadId?: string;
}

export const Editor = ({ categoryId, threadId }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditorSchemaType>({
    resolver: zodResolver(EditorSchema),
    defaultValues: {
      categoryId,
      threadId,
      content: "asdfasdf",
      title: "asdfasdfadfs",
    },
  });

  const {
    mutate: mutateThread,
    isPending: isPendingThread,
    error: errorThread,
  } = useCreateThreadMutation();

  const {
    mutate: mutatePost,
    isPending: isPendingPost,
    error: errorPost,
  } = useCreatePostMutation();

  const doSubmit: SubmitHandler<EditorSchemaType> = async (data) => {
    if (categoryId) {
      mutateThread({
        categoryId: categoryId || "",
        content: randParagraph() || data.content,
        title: randPost().title || data.title || "",
      });
    } else {
      mutatePost({
        threadId: threadId || "",
        title: randPost().title || data.title,
        content: randParagraph() || data.content,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(doSubmit)}
      className="card flex flex-col gap-4 p-4"
    >
      <div className="bg-secondary font-header -mt-4 -mx-4 px-4 py-2 text-inverse">
        Create new topic
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
          Create
        </Button>
      </div>
    </form>
  );
};
