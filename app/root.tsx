import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import "./tailwind.css";
import { Providers } from "./components";
import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const loader = () => {
  // const storedTheme = localStorage.getItem("theme");
  return null;
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
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
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
