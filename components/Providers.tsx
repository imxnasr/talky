"use client";

import { FC, ReactNode, useEffect } from "react";

interface ProvidersProps {
  children: ReactNode;
}

export const Providers: FC<ProvidersProps> = ({ children }) => {
  useEffect(() => {
    if (typeof window !== undefined) {
      // Check if the user have selected a theme
      const selectedTheme = localStorage.getItem("theme");
      if (selectedTheme) {
        // If the user had selected a theme, use that
        document.documentElement.classList.add(selectedTheme);
      } else {
        // Use the dark theme if the system theme is dark
        document.documentElement.classList.add("dark");
        // Set the dark theme as the default
        localStorage.setItem("theme", "dark");
      }
    }
  }, []);
  return children;
};
