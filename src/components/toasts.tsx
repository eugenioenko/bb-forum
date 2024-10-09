"use client";

import { useToastStore } from "@/stores/toast.store";

export const Toasts = () => {
  const toasts = useToastStore().toasts;
  return (
    <div className="fixed top-0 left-0 right-0 h-0">
      <div className="flex flex-col md:items-center gap-2 p-2">
        {toasts.map((toast) => (
          <Toast key={toast.id} message={toast.message} />
        ))}
      </div>
    </div>
  );
};

interface ToastProps {
  message: string;
}
const Toast = ({ message }: ToastProps) => {
  return (
    <div className="text-inverse bg-accent py-2 px-4 flex items-center rounded gap-2">
      <div className="flex-grow">{message}</div>
    </div>
  );
};
