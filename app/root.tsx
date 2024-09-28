import { json, Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from "@remix-run/react";
import { Providers } from "./components";
import "./tailwind.css";

declare global {
  interface Window {
    ENV: {
      PUSHER_APP_KEY: string;
    };
  }
}

export const loader = () => {
  return json({
    ENV: {
      PUSHER_APP_KEY: process.env.PUSHER_APP_KEY,
    },
  });
};

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useLoaderData<typeof loader>();
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
            window.ENV = ${JSON.stringify(data.ENV)};
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
