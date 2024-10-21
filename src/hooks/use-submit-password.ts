"use client";
import { useAuthPasswordMutation } from "@/queries/client/user-auth-password";
import { ChangePasswordSchemaType } from "@/schemas/change-pwd.schema";
import { useAuthStore } from "@/stores/auth.store";
import { useToastStore } from "@/stores/toast.store";
import { parseAxiosError } from "@/utils/axios-error";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";

export const useSubmitPassword = () => {
  const [serverError, setServerError] = useState("");
  const mutation = useAuthPasswordMutation();
  const auth = useAuthStore();
  const toast = useToastStore();

  const doSubmit: SubmitHandler<ChangePasswordSchemaType> = (data) => {
    mutation?.mutate(data, {
      onError: (error) => {
        setServerError(parseAxiosError(error));
      },
      onSuccess: (data) => {
        if (data.data.success) {
          toast.addToast("Password updated successfully");
        }
      },
    });
  };

  return { serverError, doSubmit, isPending: mutation.isPending };
};
