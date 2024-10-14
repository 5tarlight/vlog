import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "YEAHx4 Blog",
  description: "YEAHx4 블로그",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
