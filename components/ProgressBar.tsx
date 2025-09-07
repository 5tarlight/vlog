"use client";

import { ProgressProvider } from "@bprogress/next/app";
import { ReactNode, useEffect, useState } from "react";

export default function ProgressBar({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };

    const observer = new MutationObserver(() => checkDarkMode());
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    checkDarkMode();

    return () => observer.disconnect();
  }, []);

  return (
    <ProgressProvider
      height="4px"
      color={isDarkMode ? "#fff" : "#8f8f8f"}
      options={{ showSpinner: false }}
      shallowRouting
    >
      {children}
    </ProgressProvider>
  );
}
