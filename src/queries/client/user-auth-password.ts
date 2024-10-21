import { ApiResponse } from "@/models/api-response";
import { ChangePasswordSchemaType } from "@/schemas/change-pwd.schema";
import { client } from "@/services/axios.client";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useAuthPasswordMutation = () =>
  useMutation<
    ApiResponse<{ success: boolean }>,
    AxiosError,
    ChangePasswordSchemaType
  >({
    mutationFn: (data) =>
      client.post("/api/auth/password", data).then((res) => res.data),
  });
