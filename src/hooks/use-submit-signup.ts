"use client";
import { useAuthSignupMutation } from "@/queries/client/use-auth-signup";
import { SignupSchemaType } from "@/schemas/signup-schema";
import { useAppStore } from "@/stores/app.store";
import { useAuthStore } from "@/stores/auth.store";
import { parseAxiosError } from "@/utils/axios-error";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useSubmitEditor } from "./use-submit-editor";
import { useToastStore } from "@/stores/toast.store";

export const useSubmitSignup = () => {
  const [serverError, setServerError] = useState("");
  const mutation = useAuthSignupMutation();
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

  const doSubmit: SubmitHandler<SignupSchemaType> = (data) => {
    mutation?.mutate(data, {
      onError: (error) => {
        setServerError(parseAxiosError(error));
      },
      onSuccess: (data) => {
        auth.setAuthUser(data.data);
        toast.addToast(`Welcome ${data.data.username}!`);
        handlePendingEditorOrHome();
      },
    });
  };

  return { serverError, doSubmit, isPending: mutation.isPending || isPending };
};
