import type { Metadata } from "next";
import "./globals.css";
import { BackgroundImage } from "@/src/entities";

export const metadata: Metadata = {
  title: "deemo",
  description: "deemo portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased relative">
        <BackgroundImage />
        {children}
      </body>
    </html>
  );
}
