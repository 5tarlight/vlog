import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { cn } from "@/utils/cn";

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
      <body>
        <Header />
        <main
          className={cn(
            "max-w-[1024px] w-full mx-auto min-h-[100vh] my-8",
            "p-4"
          )}
        >
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
