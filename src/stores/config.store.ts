import { envIsDevelopment } from "@/environment";
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
        setTheme: (theme) => set(() => ({ theme })),
      }),
      { name: "configStore", enabled: envIsDevelopment }
    ),
    {
      name: "bbf-config",
      version: 1,
    }
  )
);
