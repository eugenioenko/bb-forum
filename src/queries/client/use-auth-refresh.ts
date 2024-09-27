import { ApiResponse } from "@/models/api-response";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AuthUserModel } from "@/models/auth-user";
import { client } from "@/services/axios.client";

export const useAuthRefreshMutation = () =>
  useMutation<ApiResponse<AuthUserModel>, AxiosError>({
    mutationFn: () =>
      client
        .post("/api/auth/refresh", { withCredentials: true })
        .then((res) => res.data),
  });
