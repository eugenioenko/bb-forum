import { AxiosInstance, AxiosResponse } from "axios";

export async function axiosFetch<T>(
  client: AxiosInstance,
  url: string
): Promise<T> {
  const response = await client.get<any, AxiosResponse<T>>(url);
  return response.data;
}

export async function axiosPost<T>(
  client: AxiosInstance,
  url: string,
  data?: any
): Promise<T> {
  const response = await client.post<any, AxiosResponse<T>>(url, data);
  return response.data;
}
