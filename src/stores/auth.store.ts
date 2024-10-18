import { envIsDevelopment } from "@/environment";
import { AuthUserModel } from "@/models/auth-user";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface AuthState {
  authUser: AuthUserModel | null | undefined;
  isLoggedIn: boolean;
  setAuthUser: (authUser: AuthUserModel | null) => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    (set) => ({
      authUser: undefined,
      isLoggedIn: false,
      setAuthUser: (authUser) =>
        set((state) => ({ authUser, isLoggedIn: !!authUser?.token })),
    }),
    { name: "authStore", enabled: envIsDevelopment }
  )
);
