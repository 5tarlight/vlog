import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils/cn";
import DarkTheme from "@/components/theme/ThemeProvider";

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
      <body
        className={cn(
          "bg-gradient-to-br from-blue-100 to-purple-100",
          "dark:from-blue-900 dark:to-purple-900"
        )}
      >
        <DarkTheme>
          <Header />
          <main
            className={cn(
              "w-full mx-auto min-h-[100vh] py-8 flex justify-center",
              "px-4"
            )}
          >
            <div className="max-w-[1024px] w-full">{children}</div>
          </main>
          <Footer />
        </DarkTheme>
      </body>
    </html>
  );
}
