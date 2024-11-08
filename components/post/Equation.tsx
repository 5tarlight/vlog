"use client";

import cn from "@yeahx4/cn";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { Suspense } from "react";

const mathJaxConfig = {
  loader: { load: ["input/tex", "output/svg"] },
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

export default function Equation({
  eq,
  inline = false,
}: {
  eq: string;
  inline?: boolean;
}) {
  return (
    <Suspense>
      <MathJaxContext config={mathJaxConfig}>
        {inline ? (
          <span
            className={cn(
              "inline-flex items-center mx-1 w-fit h-fit",
              "inline-math align-middle"
            )}
          >
            <MathJax>{`\\( ${eq} \\)`}</MathJax>
          </span>
        ) : (
          <div className="flex justify-center">
            <div
              className={cn(
                "math-container overflow-x-auto w-fit",
                "px-4 h-fit overflow-y-hidden"
              )}
            >
              <MathJax>{`\\[ ${eq} \\]`}</MathJax>
            </div>
          </div>
        )}
      </MathJaxContext>
    </Suspense>
  );
}
