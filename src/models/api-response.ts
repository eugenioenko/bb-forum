import { ApiQueryArgs } from "./api-request";

export interface ApiResponse<T> {
  data: T;
  error?: string;
  args?: ApiQueryArgs;
}

export interface UserModel {
  id: string;
  createdAt: string;
  username: string;
  email: string;
}
