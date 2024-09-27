import { client } from "@/services/axios";
import { ApiResponse, SectionModel } from "@/models/api-response";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useHomeQuery = () =>
  useQuery<ApiResponse<SectionModel[]>, AxiosError>({
    queryKey: ["home"],
    queryFn: () => client.get(`/api/home`).then((res) => res.data),
  });
