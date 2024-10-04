import { useCreatePostMutation } from "@/queries/client/use-create-post";
import { useCreateThreadMutation } from "@/queries/client/use-create-thread";
import { EditorSchemaType } from "@/schemas/editor-schema";
import { randParagraph, randPost } from "@ngneat/falso";
import { useRouter } from "next/navigation";
import { SubmitHandler } from "react-hook-form";
import { useAppStore } from "@/stores/app.store";
import { parseAxiosError } from "@/utils/axios-error";
import { AxiosError } from "axios";
import { useState } from "react";

export const useSubmitEditor = (isRecovery?: boolean) => {
  const app = useAppStore();
  const router = useRouter();
  const [serverError, setServerError] = useState("");

  const { mutate: mutateThread, isPending: isPendingThread } =
    useCreateThreadMutation();
  const { mutate: mutatePost, isPending: isPendingPost } =
    useCreatePostMutation();

  const handleError = (data: EditorSchemaType, error: AxiosError) => {
    if (error.status !== 401) {
      setServerError(parseAxiosError(error));
      return;
    }
    app.setPendingPost(data);
    router.push("/auth/login");
  };

  const doSubmit: SubmitHandler<EditorSchemaType> = async (data) => {
    if (data.categoryId) {
      mutateThread(
        {
          categoryId: data.categoryId || "",
          content: randParagraph() || data.content,
          title: randPost().title || data.title || "",
        },
        {
          onSuccess(data) {
            app.setPendingPost(null);
            router.push(`/thread/${data.data.threadId}`);
          },
          onError: (error) => handleError(data, error),
        }
      );
    } else {
      mutatePost(
        {
          threadId: data.threadId || "",
          title: data.title,
          content: data.content,
        },
        {
          onSuccess: () => {
            app.setPendingPost(null);
            if (isRecovery) {
              router.push(`/thread/${data.threadId}`);
            }
          },
          onError: (error) => handleError(data, error),
        }
      );
    }
  };

  return { serverError, doSubmit, isPending: isPendingPost || isPendingThread };
};
