import { client } from "@/services/axios";
import { ApiResponse, ThreadModel } from "@/models/api-response";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useThreadQuery = () =>
  useQuery<ApiResponse<ThreadModel[]>, AxiosError>({
    queryKey: ["threads"],
    queryFn: () => client.get(`/threads`).then((res) => res.data),
  });
