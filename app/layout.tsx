import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";
import { BackgroundImage } from "@/src/entities";
import { Header } from "@/src/widgets";
import { AppIcons } from "@/src/shared";
import { StructuredData } from "@/src/shared/ui/seo/StructuredData";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.deemo.dev"),
  title: {
    template: "%s | Deemo Portfolio",
    default: "Deemo | Frontend Developer Portfolio",
  },
  description:
    "사용자 중심의 인터랙티브 웹 경험을 만드는 프론트엔드 개발자 Deemo의 포트폴리오입니다.",
  keywords: [
    "Frontend Developer",
    "React",
    "Next.js",
    "Portfolio",
    "Web Development",
    "Seoul",
  ],
  authors: [{ name: "Deemo" }],
  creator: "Deemo",
  publisher: "Deemo",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://www.deemo.dev",
    title: "Deemo | Frontend Developer",
    description:
      "아이디어를 현실로 만드는 개발자, Deemo의 포트폴리오를 확인해보세요.",
    siteName: "Deemo Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Deemo Portfolio Open Graph Image",
      },
    ],
  },
  icons: {
    icon: AppIcons.deemo.src,
    apple: AppIcons.deemo.src,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${inter.className} antialiased relative`}>
        <StructuredData />
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
