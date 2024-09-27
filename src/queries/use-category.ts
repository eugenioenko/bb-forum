import { client } from "@/services/axios";
import { ApiResponse, CategoryModel } from "@/models/api-response";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useCategoryQuery = (id: string) =>
  useQuery<ApiResponse<CategoryModel>, AxiosError>({
    queryKey: ["categories"],
    queryFn: () => client.get(`/categories/${id}`).then((res) => res.data),
  });
