"use client";

import { ScriptProps } from "next/script";
import React, { createContext, useEffect, useState } from "react";
import { useAuthStore } from "@/stores/auth.store";
import { refreshAuthToken, client } from "@/services/axios.client";

export const AxiosContext = createContext<null>(null);

export const AxiosProvider = ({ children }: ScriptProps) => {
  const auth = useAuthStore();
  const [isReady, setIsReady] = useState(false);

  const refreshToken = async (): Promise<void> => {
    const { data } = await refreshAuthToken(client);
    if (data?.token) {
      auth.setAuthUser(data);
    }
    setIsReady(true);
  };

  useEffect(() => {
    refreshToken();
  }, []);

  if (isReady) {
    return (
      <AxiosContext.Provider value={null}>{children}</AxiosContext.Provider>
    );
  }
};
