"use client";

import { useAuthLogoutMutation } from "@/queries/client/use-auth-logout";
import { useAuthStore } from "@/stores/auth.store";
import { useToastStore } from "@/stores/toast.store";
import { IconFidgetSpinner } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const Logout = () => {
  const mutation = useAuthLogoutMutation();
  const auth = useAuthStore();
  const router = useRouter();
  const toasts = useToastStore();

  const logout = async () => {
    try {
      await mutation?.mutateAsync(undefined);
      auth.setAuthUser(null);
    } finally {
      toasts.addToast("See you soon!");
      setTimeout(() => {
        router.push("/home");
      }, 900);
    }
  };

  useEffect(() => {
    logout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <IconFidgetSpinner className="animate-spin" size={64} />
    </div>
  );
};
