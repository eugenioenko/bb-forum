import { IdName } from "@/models/id-name";
import { useAppStore } from "@/stores/app.store";

export function useCurrentCategory(category?: IdName): void {
  const appStore = useAppStore();
  if (appStore.currentCategory !== category) {
    //appStore.setCurrentCategory(category);
  }
}
