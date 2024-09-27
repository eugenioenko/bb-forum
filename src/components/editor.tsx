"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./button";
import { ThreadSchemaType, ThreadSchema } from "@/schemas/thread-schema";

interface Props {
  categoryId?: string;
}

export const Editor = ({ categoryId }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ThreadSchemaType>({
    resolver: zodResolver(ThreadSchema),
    defaultValues: {
      categoryId,
      title: new Date().toJSON(),
      content: "message",
    },
  });

  const [createThreadMutation, { loading }] = useCreateThreadMutation();

  const doSubmit: SubmitHandler<ThreadSchemaType> = async (data) => {
    await createThreadMutation({
      variables: {
        input: {
          categoryId: categoryId || "",
          content: data.content,
          title: data.title,
        },
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(doSubmit)}
      className="card flex flex-col gap-4 p-4"
    >
      <div>
        <label>Title</label>
        <input className="w-full" {...register("title")} />
        {errors.title && <span className="error">{errors.title.message}</span>}
      </div>
      <div>
        <label>Content</label>
        <textarea className="w-full" {...register("content")}></textarea>
        {errors.content && (
          <span className="error">{errors.content.message}</span>
        )}
      </div>
      <div className="flex justify-end">
        <Button type="submit" isLoading={loading}>
          Create
        </Button>
      </div>
    </form>
  );
};
