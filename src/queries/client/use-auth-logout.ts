import { ApiResponse } from "@/models/api-response";
import { client } from "@/services/axios.client";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useAuthLogoutMutation = () =>
  useMutation<ApiResponse<void>, AxiosError>({
    mutationFn: () => client.post("/api/auth/logout").then((res) => res.data),
  });
