import { IdName } from "@/models/id-name";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface AppState {
  currentCategory: IdName | null | undefined;
  setCurrentCategory: (category?: IdName | null) => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    (set) => ({
      currentCategory: undefined,
      setCurrentCategory: (currentCategory) =>
        set((state) => ({ ...state, currentCategory })),
    }),
    { name: "appStore", enabled: true }
  )
);
