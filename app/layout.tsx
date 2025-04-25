import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DarkTheme from "@/components/theme/ThemeProvider";
import cn from "@yeahx4/cn";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: {
    template: "%s | YEAHx4 블로그",
    default: "YEAHx4 블로그",
  },
  description:
    "예사롭지 않은 블로그. 웹, wasm, AI를 좋아하는 개발자 김규산의 개인 블로그입니다. 예사롭지 않은 경험을 공유합니다.",
  openGraph: {
    url: "https://post.yeahx4.me",
    siteName: "YEAHx4 블로그",
    images: {
      url: "https://cdn.jsdelivr.net/gh/5tarlight/vlog-image@main/thumbnail/yeahx4bg.png",
      alt: "YEAHx4",
      width: 1280,
      height: 720,
    },
  },
  robots: {
    follow: true,
    index: true,
  },
  twitter: {
    creator: "@yeahx44",
    images: {
      url: "https://cdn.jsdelivr.net/gh/5tarlight/vlog-image@main/thumbnail/yeahx4bg.png",
      alt: "YEAHx4",
      width: 1280,
      height: 720,
    },
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link
          rel="alternate"
          href="/rss"
          type="application/rss+xml"
          title="RSS"
        />
      </head>
      <body
        className={cn(
          "bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200",
          "transition-colors duration-300 ease-in-out"
        )}
      >
        <Analytics />
        <SpeedInsights />
        <DarkTheme>
          <Header />
          <main
            className={cn(
              "w-full mx-auto min-h-[100vh] py-8 flex justify-center",
              "px-4 pt-32"
            )}
          >
            <div className="w-full">{children}</div>
          </main>
          <Footer />
        </DarkTheme>
      </body>
    </html>
  );
}
