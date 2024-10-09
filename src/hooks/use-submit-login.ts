"use client";
import { useAuthLoginMutation } from "@/queries/client/use-auth-login";
import { LoginSchemaType } from "@/schemas/login-schema";
import { useAppStore } from "@/stores/app.store";
import { useAuthStore } from "@/stores/auth.store";
import { parseAxiosError } from "@/utils/axios-error";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useSubmitEditor } from "./use-submit-editor";
import { useToastStore } from "@/stores/toast.store";

export const useSubmitLogin = () => {
  const [serverError, setServerError] = useState("");
  const mutation = useAuthLoginMutation();
  const router = useRouter();
  const auth = useAuthStore();
  const appState = useAppStore();
  const toast = useToastStore();
  const { doSubmit: doSubmitEditor, isPending } = useSubmitEditor(true);

  const handlePendingEditorOrHome = () => {
    if (!appState.pendingPost) {
      router.push("/home");
      return;
    }
    doSubmitEditor(appState.pendingPost);
  };

  const doSubmit: SubmitHandler<LoginSchemaType> = (data) => {
    mutation?.mutate(data, {
      onError: (error) => {
        setServerError(parseAxiosError(error));
      },
      onSuccess: (data) => {
        auth.setAuthUser(data.data);
        toast.addToast(`Welcome back ${data.data.username}!`);
        handlePendingEditorOrHome();
      },
    });
  };

  return { serverError, doSubmit, isPending: mutation.isPending || isPending };
};
