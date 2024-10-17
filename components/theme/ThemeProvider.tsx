"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

export default function DarkTheme({ children }: { children: ReactNode }) {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
}
