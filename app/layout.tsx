import type { Metadata } from "next";
import { ReactNode } from "react";
import { Navbar, Providers } from "@/components";
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
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
