"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { prism as lightTheme } from "react-syntax-highlighter/dist/esm/styles/prism";
import { atomDark as darkTheme } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { useEffect, useState } from "react";

export default function CodeBlock({
  content,
  lang,
}: {
  content: string;
  lang: string;
}) {
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
    <SyntaxHighlighter
      language={lang}
      style={isDarkMode ? darkTheme : lightTheme}
    >
      {content}
    </SyntaxHighlighter>
  );
}
