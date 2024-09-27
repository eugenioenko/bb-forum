import { ApiResponse } from "@/models/api-response";
import { client } from "@/services/axios.client";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { CategoryModel } from "../server/category.prisma";

export const useCategoryQuery = (
  categoryId: string,
  initialData: CategoryModel
) =>
  useQuery<ApiResponse<CategoryModel>, AxiosError>({
    queryKey: ["categories"],
    queryFn: () =>
      client.get(`/api/category/${categoryId}`).then((res) => res.data),
    refetchOnMount: false,
    initialData: () => ({
      data: initialData,
    }),
  });
