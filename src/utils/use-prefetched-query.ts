import { ApiResponse } from "@/models/api-response";
import { client } from "@/services/axios.client";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

export function usePrefetchedQuery<T>(
  endpoint: string,
  initialData: ApiResponse<T> | undefined
) {
  const [dataItem, setDataItem] = useState(initialData);

  const { data, isLoading, error } = useQuery<ApiResponse<T>, AxiosError>({
    queryKey: [endpoint],
    queryFn: () => client.get(endpoint).then((res) => res.data),
    refetchOnMount: true,
    staleTime: 1000 * 60 * 3, //3 minutes
    retry: false,
    initialData,
  });

  useEffect(() => {
    if (data?.data) {
      setDataItem(data);
    }
  }, [data, error]);

  return { data: dataItem, isLoading, error };
}
