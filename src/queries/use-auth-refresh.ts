import { client } from "@/services/axios";
import { ApiResponse } from "@/models/api-response";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AuthUserModel } from "@/models/auth-user";

export const useAuthRefreshMutation = () =>
  useMutation<ApiResponse<AuthUserModel>, AxiosError>({
    mutationFn: () =>
      client
        .post("/api/auth/refresh", { withCredentials: true })
        .then((res) => res.data),
  });
