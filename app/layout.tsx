import type { Metadata } from "next";
import { ReactNode } from "react";
import { Providers } from "@/components";
import { appName } from "@/utils/constants";
import "./globals.css";

export const metadata: Metadata = {
  title: appName,
  description: `${appName} is a real-time messaging app.`,
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function() {
              const storedTheme = localStorage.getItem('theme');
              const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
              const theme = storedTheme ? storedTheme : (prefersDarkScheme ? 'dark' : 'light');
              document.documentElement.classList.add(theme);
            })();
            `,
          }}
        />
      </head>
      <body className="bg-gray text-color h-screen overflow-hidden">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
