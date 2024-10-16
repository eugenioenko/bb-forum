"use client";

import { ScriptProps } from "next/script";
import React, { createContext, useCallback, useEffect, useState } from "react";
import { useAuthStore } from "@/stores/auth.store";
import { refreshAuthToken, client } from "@/services/axios.client";

export const AxiosContext = createContext<null>(null);

export const AxiosProvider = ({ children }: ScriptProps) => {
  const { setAuthUser } = useAuthStore();
  const [isReady, setIsReady] = useState(false);

  const refreshToken = useCallback(async (): Promise<void> => {
    const { data } = await refreshAuthToken(client);
    if (data?.token) {
      setAuthUser(data);
    }
    setIsReady(true);
  }, [setAuthUser]);

  useEffect(() => {
    refreshToken();
  }, [refreshToken]);

  if (isReady) {
    return (
      <AxiosContext.Provider value={null}>{children}</AxiosContext.Provider>
    );
  }
};
