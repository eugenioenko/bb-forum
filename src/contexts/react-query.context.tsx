"use client";

import { ScriptProps } from "next/script";
import React, { createContext } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const ReactQueryContext = createContext<any>(null);

export const ReactQueryProvider = ({ children }: ScriptProps) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
