import { envIsDevelopment } from "@/environment";
import { AuthUserModel } from "@/models/auth-user";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface AuthState {
  authUser: AuthUserModel | null | undefined;
  isLoggedIn: boolean;
  isAdmin: boolean;
  setAuthUser: (authUser: AuthUserModel | null) => void;
  setUsername: (username: string) => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    (set) => ({
      authUser: undefined,
      isLoggedIn: false,
      isAdmin: false,
      setAuthUser: (authUser) => {
        return set(() => ({
          authUser,
          isLoggedIn: !!authUser?.token,
          isAdmin: !!authUser?.roles.includes("admin"),
        }));
      },
      setUsername: (username) => {
        set((state) => {
          if (state.authUser) {
            return {
              authUser: {
                ...state.authUser,
                username,
              },
            };
          }
          return {};
        });
      },
    }),
    { name: "authStore", enabled: envIsDevelopment }
  )
);
