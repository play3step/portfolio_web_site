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
    default: "Deemo | 프론트엔드 개발자 포트폴리오",
  },
  description:
    "Next.js와 React, FSD 아키텍처로 사용자 중심의 인터랙티브 웹 경험을 설계하는 프론트엔드 개발자 Deemo의 포트폴리오입니다.",
  keywords: [
    "프론트엔드 개발자",
    "Frontend Developer",
    "React",
    "Next.js",
    "TypeScript",
    "FSD Architecture",
    "Portfolio",
    "Web Development",
    "Seoul",
  ],
  authors: [{ name: "Deemo", url: "https://www.deemo.dev" }],
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
  },

  twitter: {
    card: "summary_large_image",
    title: "Deemo | Frontend Developer Portfolio",
    description: "아이디어를 현실로 만드는 개발자 Deemo",
  },

  icons: {
    icon: AppIcons.deemo.src,
    apple: AppIcons.deemo.src,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
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

        <main>
          <div className="sr-only">
            <h1>프론트엔드 개발자 Deemo의 웹 포트폴리오</h1>
            <p>
              안녕하세요. 사용자 경험(UX)과 인터랙티브 웹을 사랑하는 프론트엔드
              개발자 Deemo입니다. 이 사이트는{" "}
              <strong>Next.js 14, React, TypeScript</strong>를 기반으로
              제작되었으며, 유지보수성과 확장성을 위해{" "}
              <strong>FSD(Feature-Sliced Design) 아키텍처</strong>를
              적용했습니다.
            </p>
            <section>
              <h2>기술 스택 (Tech Stack)</h2>
              <ul>
                <li>Core: React, Next.js (App Router), TypeScript</li>
                <li>State Management: Zustand, React Query</li>
                <li>Styling: Tailwind CSS, Framer Motion</li>
                <li>Architecture: FSD (Feature-Sliced Design)</li>
              </ul>
            </section>
            <section>
              <h2>주요 프로젝트 (Projects)</h2>
              <ul>
                <li>
                  <strong>Deemo OS:</strong> Mac OS 인터페이스를 웹으로 구현한
                  인터랙티브 포트폴리오
                </li>
                <li>
                  <strong>MapleLink:</strong> 메이플스토리 API 기반 캐릭터 검색
                  서비스
                </li>
                <li>
                  <strong>MoreView & Planding:</strong> 한이음 ICT 멘토링 최우수
                  프로젝트 경험
                </li>
              </ul>
            </section>
          </div>

          {children}
        </main>
      </body>
    </html>
  );
}
