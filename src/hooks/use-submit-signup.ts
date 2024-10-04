"use client";
import { useAuthSignupMutation } from "@/queries/client/use-auth-signup";
import { SignupSchemaType } from "@/schemas/signup-schema";
import { useAuthStore } from "@/stores/auth.store";
import { parseAxiosError } from "@/utils/axios-error";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";

export const useSubmitSignup = () => {
  const [serverError, setServerError] = useState("");
  const mutation = useAuthSignupMutation();
  const router = useRouter();
  const auth = useAuthStore();

  const doSubmit: SubmitHandler<SignupSchemaType> = (data) => {
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
