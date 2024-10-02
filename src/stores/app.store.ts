import { IdName } from "@/models/id-name";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface AppState {
  theme: string | null | undefined;
  setTheme: (theme: string | null) => void;
  currentCategory: IdName | null | undefined;
  setCurrentCategory: (category?: IdName | null) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    devtools(
      (set) => ({
        theme: undefined,
        setTheme: (theme) => set((state) => ({ ...state, theme })),
        currentCategory: undefined,
        setCurrentCategory: (currentCategory) =>
          set((state) => ({ ...state, currentCategory })),
      }),
      { name: "appStore", enabled: true }
    ),
    {
      name: "bb-store",
      version: 1,
    }
  )
);
