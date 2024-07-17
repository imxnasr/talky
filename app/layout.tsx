import type { Metadata } from "next";
import { ReactNode, useEffect } from "react";
import { Providers } from "@/components";
import "./globals.css";

export const metadata: Metadata = {
  title: "Talky",
  description: "Talky is a real-time messaging app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
