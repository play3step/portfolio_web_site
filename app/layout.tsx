import type { Metadata } from "next";
import "./globals.css";
import { BackgroundImage } from "@/src/entities";
import { Header } from "@/src/widgets";

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
        <Header />
        <BackgroundImage />
        {children}
      </body>
    </html>
  );
}
