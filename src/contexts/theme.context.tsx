"use client";

import { useAppStore } from "@/stores/app.store";
import { ScriptProps } from "next/script";
import React, { createContext, useEffect } from "react";

export const ThemeContext = createContext<null>(null);

export const ThemeProvider = ({ children }: ScriptProps) => {
  useEffect(() => {
    const storedTheme = useAppStore.getState().theme;
    const currentTheme = document.body.className;
    if (storedTheme && currentTheme !== storedTheme) {
      document.body.className = storedTheme;
    }
  }, []);

  return <ThemeContext.Provider value={null}>{children}</ThemeContext.Provider>;
};
