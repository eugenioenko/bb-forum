import axios, { AxiosInstance } from "axios";
import { useAuthStore } from "@/stores/auth";
import { AuthUserModel } from "@/models/auth-user";
import { ApiResponse } from "@/models/api-response";

export function refreshAuthToken(
  client: AxiosInstance
): Promise<ApiResponse<AuthUserModel>> {
  return client
    .post("/api/auth/refresh", { withCredentials: true })
    .catch(() => ({ data: { error: "not found" } }))
    .then((res) => res.data);
}

function createAxiosInstance(): AxiosInstance {
  const client = axios.create({
    baseURL: "",
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  client.interceptors.request.use((config) => {
    const auth = useAuthStore.getState();
    const token = auth.authUser?.token;
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  });

  client.interceptors.response.use(
    (response) => response,
    async (error) => {
      const auth = useAuthStore.getState();
      const originalRequest = error.config;

      if (
        originalRequest._retry ||
        error?.response?.status !== 401 ||
        [101, 102].includes(error.response.data?.code)
      ) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;
      try {
        // refresh token is stored in server cookie
        const { data } = await refreshAuthToken(client);
        if (data?.token) {
          auth.setAuthUser(data);
          return client(originalRequest);
        }
        // Retry the original request with the new access token.
      } catch (refreshError) {
        auth.setAuthUser(null);
        return Promise.reject(refreshError);
      }
    }
  );

  return client;
}

export const client = createAxiosInstance();
