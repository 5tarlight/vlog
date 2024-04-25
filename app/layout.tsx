import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React, { ReactNode } from "react";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { getImage } from "@/api/imageCdn";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | YEAHx4",
    default: "YEAHx4",
  },
  description: "YEAHx4 개발 블로그",
  icons: {
    icon: "/yeahx4_cat.png",
  },
  openGraph: {
    images: {
      url: getImage("thumbnail/yeahx4.png"),
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
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" href={"/yeahx4_cat.png"} />
      </head>
      <body className={inter.className}>
        <Header />
        <Analytics />
        <main className="px-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
