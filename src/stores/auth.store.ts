import { envIsDevelopment } from "@/environment";
import { AuthUserModel } from "@/models/auth-user";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface AuthState {
  authUser: AuthUserModel | null | undefined;
  isLoggedIn: boolean;
  isAdmin: boolean;
  setAuthUser: (authUser: AuthUserModel | null) => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    (set) => ({
      authUser: undefined,
      isLoggedIn: false,
      isAdmin: false,
      setAuthUser: (authUser) => {
        return set((_) => ({
          authUser,
          isLoggedIn: !!authUser?.token,
          isAdmin: !!authUser?.roles.includes("admin"),
        }));
      },
    }),
    { name: "authStore", enabled: envIsDevelopment }
  )
);
