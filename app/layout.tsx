import type { Metadata } from "next";
import { ReactNode } from "react";
import { Navbar, Providers } from "@/components";
import { appName } from "@/utils/constants";
import "./globals.css";

export const metadata: Metadata = {
  title: appName,
  description: `${appName} is a real-time messaging app.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray h-screen overflow-hidden flex">
        <Providers>
          <Navbar />
          <main className="bg-slate rounded-3xl p-5 flex flex-1">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
