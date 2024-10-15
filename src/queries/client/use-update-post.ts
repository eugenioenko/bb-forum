import { ApiResponse } from "@/models/api-response";
import { client } from "@/services/axios.client";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Post } from "@prisma/client";
import { UpdatePostSchemaType } from "@/schemas/post-schema";

export const useUpdatePostMutation = () =>
  useMutation<
    ApiResponse<Post>,
    AxiosError<ApiResponse<never>>,
    UpdatePostSchemaType
  >({
    mutationFn: (data) =>
      client
        .post(`/api/post/${data.postId}/update`, data)
        .then((res) => res.data),
  });
