import { ApiResponse } from "@/models/api-response";
import axios, { AxiosResponse } from "axios";
import { parseAxiosError } from "./axios-error";
import { setupCache } from "axios-cache-interceptor";

const axiosClient = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const clientWithCache = setupCache(axiosClient, {
  ttl: 3000, // 3 seconds global cache
});

export async function axiosFetchCached<T>(
  url: string
): Promise<ApiResponse<T>> {
  try {
    const response = await clientWithCache.get<
      any,
      AxiosResponse<ApiResponse<T>>
    >(url);
    return response.data;
  } catch (e) {
    return { error: parseAxiosError(e), data: undefined as never };
  }
}
