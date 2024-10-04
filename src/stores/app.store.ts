import { IdName } from "@/models/id-name";
import { EditorSchemaType } from "@/schemas/editor-schema";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface AppState {
  currentCategory: IdName | null | undefined;
  setCurrentCategory: (category?: IdName | null) => void;
  pendingPost: EditorSchemaType | null | undefined;
  setPendingPost: (post: EditorSchemaType | null) => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    (set) => ({
      currentCategory: undefined,
      setCurrentCategory: (currentCategory) =>
        set((state) => ({ ...state, currentCategory })),
      pendingPost: undefined,
      setPendingPost: (pendingPost) =>
        set((state) => ({ ...state, pendingPost })),
    }),
    { name: "appStore", enabled: true }
  )
);
