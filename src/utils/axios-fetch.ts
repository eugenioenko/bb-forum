import { ApiResponse } from "@/models/api-response";
import axios, { AxiosResponse } from "axios";
import { parseAxiosError } from "./axios-error";

const client = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function axiosFetch<T>(url: string): Promise<ApiResponse<T>> {
  try {
    const response = await client.get<any, AxiosResponse<ApiResponse<T>>>(url);
    return response.data;
  } catch (e) {
    return { error: parseAxiosError(e), data: undefined as never };
  }
}
