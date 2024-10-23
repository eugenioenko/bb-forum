"use client";

import { useUpdateProfileMutation } from "@/queries/client/use-update-profile";
import { ProfileSchemaType } from "@/schemas/profile-schema";
import { useToastStore } from "@/stores/toast.store";
import { parseAxiosError } from "@/utils/axios-error";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";

export const useSubmitProfile = () => {
  const [serverError, setServerError] = useState("");
  const mutation = useUpdateProfileMutation();
  const toast = useToastStore();

  const doSubmit: SubmitHandler<ProfileSchemaType> = (data) => {
    mutation?.mutate(data, {
      onError: (error) => {
        setServerError(parseAxiosError(error));
      },
      onSuccess: () => {
        toast.addToast("Profile updated successfully");
      },
    });
  };

  return { serverError, doSubmit, isPending: mutation.isPending };
};