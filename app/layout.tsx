import type { Metadata } from "next";

import "./globals.css";
import Image from "next/image";

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
        <Image
          src="/background1.jpg"
          alt="background"
          fill
          className="object-cover -z-10"
          priority
          quality={95}
          sizes="100vw"
        />
        {children}
      </body>
    </html>
  );
}
