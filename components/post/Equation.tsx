"use client";

import { cn } from "@/lib/utils/cn";
import { MathJax, MathJaxContext } from "better-react-mathjax";

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
    <MathJaxContext config={mathJaxConfig}>
      {inline ? (
        <span className="inline-flex items-center mx-1 w-fit h-fit inline-math align-middle">
          <MathJax>{`\\( ${eq} \\)`}</MathJax>
        </span>
      ) : (
        <div className="flex justify-center">
          <div
            className={cn(
              "math-container overflow-x-scroll w-fit",
              "px-4 scroll-m-[-1rem] h-fit overflow-y-hidden"
            )}
          >
            <MathJax>{`\\[ ${eq} \\]`}</MathJax>
          </div>
        </div>
      )}
    </MathJaxContext>
  );
}