import { ApiResponse } from "@/models/api-response";
import { ThreadSchemaType } from "@/schemas/thread-schema";
import { client } from "@/services/axios.client";
import { handleAxiosError } from "@/utils/axios-error";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Post } from "@prisma/client";

export const useCreateThreadMutation = () =>
  useMutation<
    ApiResponse<Post>,
    AxiosError<ApiResponse<never>>,
    ThreadSchemaType
  >({
    mutationFn: (data) =>
      client
        .post("/api/thread", data)
        .then((res) => res.data)
        .catch(handleAxiosError),
  });
