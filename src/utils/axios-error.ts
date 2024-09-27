import { ApiResponse } from "@/models/api-response";
import { AxiosError } from "axios";

export function handleAxiosError(error: AxiosError<ApiResponse<never>>): Error {
  throw Error(error.response?.data.error || "Unexpected Error");
}
