"use client";
import { useAuthLoginMutation } from "@/queries/client/use-auth-login";
import { LoginSchemaType } from "@/schemas/login-schema";
import { useAuthStore } from "@/stores/auth.store";
import { parseAxiosError } from "@/utils/axios-error";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";

export const useSubmitLogin = () => {
  const [serverError, setServerError] = useState("");
  const mutation = useAuthLoginMutation();
  const router = useRouter();
  const auth = useAuthStore();

  const doSubmit: SubmitHandler<LoginSchemaType> = (data) => {
    mutation?.mutate(data, {
      onError: (error) => {
        setServerError(parseAxiosError(error));
      },
      onSuccess: (data) => {
        auth.setAuthUser(data.data);
        router.push("/home");
      },
    });
  };

  return { serverError, doSubmit, isPending: mutation.isPending };
};
