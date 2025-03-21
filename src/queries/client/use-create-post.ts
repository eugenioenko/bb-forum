import { ApiResponse } from "@/models/api-response";
import { CreatePostSchemaType } from "@/schemas/post-schema";
import { client } from "@/services/axios.client";
import { Post } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useCreatePostMutation = () =>
  useMutation<
    ApiResponse<Post>,
    AxiosError<ApiResponse<never>>,
    CreatePostSchemaType
  >({
    mutationFn: (data) =>
      client.post("/api/post", data).then((res) => res.data),
  });
