"use client";

import { ChangePwdForm } from "@/components/change-pwd";
import { useAuthStore } from "@/stores/auth.store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { UpdateProfile } from "./update-profile";

export const Settings = () => {
  const isLoggedIn = useAuthStore().isLoggedIn;
  const routerPush = useRouter().push;
  useEffect(() => {
    if (!isLoggedIn) {
      routerPush("/home");
    }
  }, [isLoggedIn, routerPush]);
  return (
    <div className="pt-4 flex flex-col gap-4">
      <UpdateProfile />
      <ChangePwdForm />
    </div>
  );
};
