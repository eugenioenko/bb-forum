import { useCreatePostMutation } from "@/queries/client/use-create-post";
import { useCreateThreadMutation } from "@/queries/client/use-create-thread";
import { useUpdatePostMutation } from "@/queries/client/use-update-post";
import { EditorSchemaType } from "@/schemas/editor-schema";
import { useAppStore } from "@/stores/app.store";
import { useToastStore } from "@/stores/toast.store";
import { parseAxiosError } from "@/utils/axios-error";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";

export const useSubmitEditor = (isRecovery?: boolean) => {
  const appState = useAppStore();
  const toast = useToastStore();
  const router = useRouter();
  const [serverError, setServerError] = useState("");

  const { mutate: mutateThread, isPending: isPendingThread } =
    useCreateThreadMutation();
  const { mutate: mutatePost, isPending: isPendingPost } =
    useCreatePostMutation();
  const { mutate: mutateUpdate, isPending: isPendingUpdate } =
    useUpdatePostMutation();

  const handleError = (data: EditorSchemaType, error: AxiosError) => {
    if (error.status !== 401) {
      setServerError(parseAxiosError(error));
      return;
    }
    appState.setPendingPost(data);
    router.push("/auth/login");
  };

  let doSubmitSuccess: (() => void) | undefined = undefined;

  const doSubmit: SubmitHandler<EditorSchemaType> = async (data) => {
    if (data.postId) {
      mutateUpdate(
        {
          postId: data.postId || "",
          title: data.title,
          content: data.content,
        },
        {
          onSuccess: () => {
            appState.setPendingPost(null);
            toast.addToast("Post updated successfully");
            router.push(`/thread/${data.threadId}`);
          },
          onError: (error) => handleError(data, error),
        }
      );
    } else if (data.categoryId) {
      mutateThread(
        {
          categoryId: data.categoryId || "",
          content: data.content,
          title: data.title || "",
        },
        {
          onSuccess(data) {
            appState.setPendingPost(null);
            toast.addToast("Topic published successfully");
            router.push(`/thread/${data.data.threadId}`);
            router.refresh();
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
            appState.setPendingPost(null);
            toast.addToast("Post published successfully");
            if (isRecovery) {
              router.push(`/thread/${data.threadId}`);
              router.refresh();
            }
            doSubmitSuccess?.();
          },
          onError: (error) => handleError(data, error),
        }
      );
    }
  };

  const onSubmitSuccess = (doSuccess: () => void) => {
    doSubmitSuccess = doSuccess;
  };

  return {
    serverError,
    doSubmit,
    onSubmitSuccess,
    isPending: isPendingPost || isPendingThread || isPendingUpdate,
  };
};
