import type { Metadata } from "next";
import Script from "next/script"; // 1. Script 컴포넌트 임입
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
        <Script id="microsoft-clarity-analytics" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "urzac2sa25");
          `}
        </Script>

        <Header />
        <BackgroundImage />
        {children}
      </body>
    </html>
  );
}
