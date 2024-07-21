import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | YEAHx4 블로그",
    default: "YEAHx4 블로그",
  },
  description: "YEAHx4 개발 블로그",
  openGraph: {}, // img here
  robots: {
    nocache: true,
    follow: true,
    index: true,
  },
  twitter: {
    creator: "@yeahx44",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <SpeedInsights />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
