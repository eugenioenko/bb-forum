import { ApiResponse } from "@/models/api-response";
import { ProfileSchemaType } from "@/schemas/profile-schema";
import { client } from "@/services/axios.client";
import { Profile } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useUpdateProfileMutation = () =>
  useMutation<ApiResponse<{ data: Profile }>, AxiosError, ProfileSchemaType>({
    mutationFn: (data) =>
      client.post("/api/profile", data).then((res) => res.data),
  });
