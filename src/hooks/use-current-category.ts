import { IdName } from "@/models/id-name";
import { useAppStore } from "@/stores/app.store";
import { useEffect } from "react";

export function useCurrentCategory(newCategory?: IdName): void {
  const appStore = useAppStore();
  const currentCategory = appStore.currentCategory;
  const setCurrentCategory = appStore.setCurrentCategory;

  useEffect(() => {
    if (currentCategory !== newCategory) {
      setCurrentCategory(newCategory);
    }
  }, [newCategory, currentCategory, setCurrentCategory]);
}
