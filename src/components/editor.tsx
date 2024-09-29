"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./button";
import { ThreadSchemaType, ThreadSchema } from "@/schemas/thread-schema";
import { useCreateThreadMutation } from "@/queries/client/use-create-thread";
import { randPost } from "@ngneat/falso";
import { useRef } from "react";

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

  const { mutate, isPending, error } = useCreateThreadMutation();

  const count = useRef(1);

  const doSubmit: SubmitHandler<ThreadSchemaType> = async (data) => {
    const post = randPost();
    mutate({
      categoryId: categoryId || "",
      content: post.body || data.content,
      title: `${count.current++} ${post.title}` || data.title,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(doSubmit)}
      className="card flex flex-col gap-4 p-4"
    >
      <div className="bg-primary font-header -mt-4 -mx-4 px-4 py-2 text-white">
        Create new thread
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
      {error && <div className="text-red-600 text-center">{error.message}</div>}
      <div className="flex justify-end">
        <Button type="submit" isLoading={isPending}>
          Create
        </Button>
      </div>
    </form>
  );
};
