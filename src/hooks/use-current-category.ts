import { IdName } from "@/models/id-name";
import { useAppStore } from "@/stores/app.store";
import { useEffect } from "react";

export function useCurrentCategory(category?: IdName): void {
  const appStore = useAppStore();
  useEffect(() => {
    if (appStore.currentCategory !== category) {
      appStore.setCurrentCategory(category);
    }
  }, [category]);
}
