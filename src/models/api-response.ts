export interface ApiResponse<T> {
  error?: string;
  skip?: number;
  data: T;
}

export interface UserModel {
  id: string;
  createdAt: string;
  username: string;
  email: string;
}
