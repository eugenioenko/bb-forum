import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface AppState {
  theme: string | null | undefined;
  setTheme: (theme: string | null) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    devtools(
      (set) => ({
        theme: undefined,
        setTheme: (theme) => set((state) => ({ ...state, theme })),
      }),
      { name: "appStore", enabled: true }
    ),
    {
      name: "bb-store",
      version: 1,
    }
  )
);
