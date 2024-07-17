"use client";

import { FC, ReactNode, useEffect } from "react";

interface ProvidersProps {
  children: ReactNode;
}

export const Providers: FC<ProvidersProps> = ({ children }) => {
  useEffect(() => {
    // Check if the user have selected a theme
    const selectedTheme = localStorage.getItem("theme");
    if (selectedTheme) {
      // If the user had selected a theme, use that
      document.documentElement.classList.add(selectedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)")) {
      // Use the dark theme if the system theme is dark
      document.documentElement.classList.add("dark");
    } else {
      // Use the light theme if the system theme is light
      document.documentElement.classList.add("dark");
    }
  }, [localStorage]);
  return <div>{children}</div>;
};
