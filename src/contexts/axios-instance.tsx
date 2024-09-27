"use client";

import { ScriptProps } from "next/script";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AxiosInstance } from "axios";
import { useAuthStore } from "@/stores/auth";
import { client, refreshAuthToken } from "@/services/axios";

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
