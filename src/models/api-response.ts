import { ApiQueryArgs } from "./api-request";

export interface ApiResponse<T> {
  data: T;
  error?: string;
  args?: ApiQueryArgs;
}
