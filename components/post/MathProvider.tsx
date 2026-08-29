"use client";

import { MathJaxContext } from "better-react-mathjax";
import { ReactNode } from "react";

const mathJaxConfig = {
  loader: { load: ["input/tex", "output/svg"] },
  startup: {
    // Let each MathJax component typeset its own hydrated subtree. Without
    // this, MathJax can transform equations that React has not hydrated yet.
    typeset: false,
  },
  tex: {
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"],
    ],
    displayMath: [
      ["$$", "$$"],
      ["\\[", "\\]"],
    ],
    processEscapes: true,
  },
};

export default function MathProvider({ children }: { children: ReactNode }) {
  return (
    <MathJaxContext config={mathJaxConfig} hideUntilTypeset="first">
      {children}
    </MathJaxContext>
  );
}
