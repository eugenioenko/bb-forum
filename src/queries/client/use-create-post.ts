import { ApiResponse } from "@/models/api-response";
import { PostSchemaType } from "@/schemas/post-schema";
import { client } from "@/services/axios.client";
import { handleAxiosError } from "@/utils/axios-error";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useCreatePostMutation = () =>
  useMutation<ApiResponse<any>, AxiosError<ApiResponse<never>>, PostSchemaType>(
    {
      mutationFn: (data) =>
        client
          .post("/api/post", data)
          .then((res) => res.data)
          .catch(handleAxiosError),
    }
  );
