"use client";

import { EditorSchema, EditorSchemaType } from "@/schemas/editor-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "./button";
import { useSubmitEditor } from "@/hooks/use-submit-editor";

interface Props {
  categoryId?: string;
  threadId?: string;
  postId?: string;
  title?: string;
  content?: string;
}

export const Editor = ({
  categoryId,
  threadId,
  postId,
  content,
  title,
}: Props) => {
  let editorTitle = "";

  if (postId) {
    editorTitle = "Update post";
  } else if (categoryId) {
    editorTitle = "Create new topic";
  } else if (threadId) {
    editorTitle = "Reply to topic";
  }

  const { doSubmit, serverError, isPending, onSubmitSuccess } =
    useSubmitEditor();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<EditorSchemaType>({
    resolver: zodResolver(EditorSchema),
    defaultValues: {
      categoryId,
      threadId,
      postId,
      content: content || "",
      title: title || "",
    },
  });

  onSubmitSuccess(() => {
    setValue("content", "");
  });
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
      {serverError && <div className="error text-center">{serverError}</div>}
      <div className="flex justify-end">
        <Button type="submit" isLoading={isPending}>
          Post
        </Button>
      </div>
    </form>
  );
};
