import { ApiResponse } from "@/models/api-response";
import { AuthUserModel } from "@/models/auth-user";
import { SignupSchemaType } from "@/schemas/signup-schema";
import { client } from "@/services/axios.client";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useAuthSignupMutation = () =>
  useMutation<ApiResponse<AuthUserModel>, AxiosError, SignupSchemaType>({
    mutationFn: (data) =>
      client.post("/api/auth/signup", data).then((res) => res.data),
  });
