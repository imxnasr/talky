// "use client";

// import { FC, ReactNode, useEffect } from "react";

// interface ProvidersProps {
//   children: ReactNode;
// }

// export const Providers: FC<ProvidersProps> = ({ children }) => {
//   useEffect(() => {
//     if (typeof window !== undefined) {
//       // Check if the user have selected a theme
//       const selectedTheme = localStorage.getItem("theme");
//       if (selectedTheme) {
//         // If the user had selected a theme, use that
//         document.documentElement.classList.add(selectedTheme);
//       } else {
//         // Use the dark theme if the system theme is dark
//         document.documentElement.classList.add("dark");
//         // Set the dark theme as the default
//         localStorage.setItem("theme", "dark");
//       }
//     }
//   }, []);
//   useEffect(() => {
//     if (typeof window !== undefined) {
//       const handleStorageChange = (e: StorageEvent) => {
//         // Remove the old theme
//         document.documentElement.classList.remove(e.oldValue || "dark");
//         // Add the new theme
//         document.documentElement.classList.add(e.newValue || "dark");
//       };
//       // Tracks the localStorage for any changes
//       window.addEventListener("storage", handleStorageChange);
//       return () => {
//         window.removeEventListener("storage", handleStorageChange);
//       };
//     }
//   }, []);
//   return children;
// };

"use client";

import { FC, ReactNode, useEffect } from "react";

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

  return <>{children}</>;
};

// "use client";

// import { FC, ReactNode, useEffect } from "react";

// interface ProvidersProps {
//   children: ReactNode;
// }

// export const Providers: FC<ProvidersProps> = ({ children }) => {
//   useEffect(() => {
//     if (typeof window !== undefined) {
//       const applyTheme = (theme: string) => {
//         document.documentElement.classList.remove("dark", "light");
//         document.documentElement.classList.add(theme);
//       };

//       const storedTheme = localStorage.getItem("theme");
//       if (storedTheme) {
//         applyTheme(storedTheme);
//       } else {
//         const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
//         const theme = prefersDarkScheme ? "dark" : "light";
//         applyTheme(theme);
//         localStorage.setItem("theme", theme);
//       }
//     }
//   }, []);

//   useEffect(() => {
//     if (typeof window !== undefined) {
//       const handleStorageChange = (e: StorageEvent) => {
//         if (e.key === "theme") {
//           document.documentElement.classList.remove(e.oldValue || "dark", "light");
//           document.documentElement.classList.add(e.newValue || "dark");
//         }
//       };

//       const handleMediaChange = (e: MediaQueryListEvent) => {
//         const newTheme = e.matches ? "dark" : "light";
//         const storedTheme = localStorage.getItem("theme");
//         if (!storedTheme) {
//           document.documentElement.classList.remove("dark", "light");
//           document.documentElement.classList.add(newTheme);
//         }
//       };

//       window.addEventListener("storage", handleStorageChange);
//       window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", handleMediaChange);

//       return () => {
//         window.removeEventListener("storage", handleStorageChange);
//         window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", handleMediaChange);
//       };
//     }
//   }, []);

//   return <>{children}</>;
// };
