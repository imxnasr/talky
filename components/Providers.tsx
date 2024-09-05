"use client";

import { FC, ReactNode, useEffect } from "react";
import { SessionProvider } from "next-auth/react";

interface ProvidersProps {
  children: Readonly<ReactNode>;
}

export const Providers: FC<ProvidersProps> = ({ children }) => {
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      // Get the user prefer theme
      const preferTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
      // Remove the old theme
      document.documentElement.classList.remove(e.oldValue || "dark", "light");
      // Add the new theme
      document.documentElement.classList.add(e.newValue || (preferTheme ? "dark" : "light"));
    };
    // Tracks the localStorage for any changes
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return <SessionProvider>{children}</SessionProvider>;
};
