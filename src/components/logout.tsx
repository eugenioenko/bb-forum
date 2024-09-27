"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth";
import { IconFidgetSpinner } from "@tabler/icons-react";
import { useAuthLogoutMutation } from "@/queries/client/use-auth-logout";

export const Logout = () => {
  const mutation = useAuthLogoutMutation();
  const auth = useAuthStore();
  const router = useRouter();

  const logout = async () => {
    try {
      await mutation?.mutateAsync(undefined);
      auth.setAuthUser(null);
    } finally {
      setTimeout(() => {
        router.push("/home");
      }, 1500);
    }
  };

  useEffect(() => {
    logout();
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <IconFidgetSpinner className="animate-spin" size={64} />
    </div>
  );
};
