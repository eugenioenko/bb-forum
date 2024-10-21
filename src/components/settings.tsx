"use client";

import { ChangePwdForm } from "@/components/change-pwd";
import { useAuthStore } from "@/stores/auth.store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const Settings = () => {
  const isLoggedIn = useAuthStore().isLoggedIn;
  const routerPush = useRouter().push;
  useEffect(() => {
    if (!isLoggedIn) {
      routerPush("/home");
    }
  }, [isLoggedIn, routerPush]);
  return <ChangePwdForm />;
};
