import { ApiResponse } from "@/models/api-response";
import { AuthUserModel } from "@/models/auth-user";
import { LoginSchemaType } from "@/schemas/login-schema";
import { client } from "@/services/axios.client";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useAuthLoginMutation = () =>
  useMutation<ApiResponse<AuthUserModel>, AxiosError, LoginSchemaType>({
    mutationFn: (data) =>
      client.post("/api/auth/login", data).then((res) => res.data),
  });
