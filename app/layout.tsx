import type { Metadata } from "next";
import { Inter, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: {
    template: "%s | YEAHx4 블로그",
    default: "YEAHx4 블로그",
  },
  icons: {
    icon: "/favicon.ico",
  },
  description: "YEAHx4 개발 블로그",
  openGraph: {
    url: "https://blog.yeahx4.me",
    siteName: "YEAHx4 블로그",
    images: {
      url: "https://cdn.jsdelivr.net/gh/5tarlight/vlog-image@main/thumbnail/yeahx4bg.png",
      alt: "YEAHx4",
      width: 1280,
      height: 720,
    },
  },
  robots: {
    nocache: true,
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

const inter = Noto_Sans_KR({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-sans-kr",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={inter.className}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <SpeedInsights />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
