"use client";

import cn from "@yeahx4/cn";
import { MathJax } from "better-react-mathjax";

export default function Equation({
  eq,
  inline = false,
}: {
  eq: string;
  inline?: boolean;
}) {
  return inline ? (
    <span
      className={cn(
        "inline-flex items-center mx-1 w-fit h-fit",
        "inline-math align-middle"
      )}
    >
      <MathJax inline dynamic={false}>{`\\( ${eq} \\)`}</MathJax>
    </span>
  ) : (
    <div className="flex justify-center">
      <div
        className={cn(
          "math-container overflow-x-auto w-fit",
          "px-4 h-fit overflow-y-hidden"
        )}
      >
        <MathJax dynamic={false}>{`\\[ ${eq} \\]`}</MathJax>
      </div>
    </div>
  );
}
