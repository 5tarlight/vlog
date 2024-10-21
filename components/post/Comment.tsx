"use client";

import Giscus from "@giscus/react";
import { useEffect, useState } from "react";

export default function Comment() {
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
    <div className="comment-container mt-16">
      <Giscus
        repo="5tarlight/vlog"
        repoId="R_kgDOLq7W8A"
        category="Comment"
        categoryId="DIC_kwDOLq7W8M4Ce8hn"
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={isDarkMode ? "dark" : "light"}
        lang="ko"
        loading="lazy"
      />
    </div>
  );
}
