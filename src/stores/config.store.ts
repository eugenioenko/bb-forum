import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface ConfigState {
  theme: string | null | undefined;
  setTheme: (theme: string | null) => void;
}

export const useConfigStore = create<ConfigState>()(
  persist(
    devtools(
      (set) => ({
        theme: undefined,
        setTheme: (theme) => set((state) => ({ ...state, theme })),
      }),
      { name: "configStore", enabled: true }
    ),
    {
      name: "bbf-config",
      version: 1,
    }
  )
);
