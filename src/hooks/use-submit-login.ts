"use client";
import { SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth";
import { useAuthLoginMutation } from "@/queries/client/use-auth-login";
import { SignupSchemaType } from "@/schemas/login-schema";

export const useSubmitLogin = () => {
  const [serverError, setServerError] = useState("");
  const mutation = useAuthLoginMutation();
  const router = useRouter();
  const auth = useAuthStore();

  const doSubmitLogin: SubmitHandler<SignupSchemaType> = (data) => {
    mutation?.mutate(data, {
      onError: (error) => {
        setServerError(error.response?.data.error || error.message);
      },
      onSuccess: (data) => {
        auth.setAuthUser(data.data);
        router.push("/home");
      },
    });
  };

  return { serverError, doSubmitLogin, isPending: mutation.isPending };
};
