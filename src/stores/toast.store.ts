import { envIsDevelopment } from "@/environment";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface Toast {
  id: string;
  message: string;
  type?: string;
}

export interface ToastStore {
  toasts: Toast[];
  addToast: (message: string, type?: string) => void;
}

export const useToastStore = create<ToastStore>()(
  devtools(
    (set) => ({
      toasts: [],
      addToast: (message: string, type?: string) => {
        const id = Math.random().toString(36).replace("0.", "");
        set((state) => {
          const toast: Toast = { id, message, type };
          return {
            toasts: [...state.toasts, toast],
          };
        });
        setTimeout(() => {
          set((state) => {
            const toasts = state.toasts.filter((toast) => toast.id !== id);
            return { toasts };
          });
        }, 3000);
      },
    }),
    { name: "toastStore", enabled: envIsDevelopment }
  )
);
