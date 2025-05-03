"use client";

import { useState } from "react";
import CodeBlock from "./CodeBlock";
import cn from "@yeahx4/cn";

export default function MultiCodeBlock({
  code,
  lang,
  name,
}: {
  code: string[];
  lang: string[];
  name: string[];
}) {
  const [active, setActive] = useState(0);

  return (
    <div
      className={cn(
        "border border-neutral-300 dark:border-neutral-700",
        "rounded-md overflow-hidden"
      )}
    >
      <div
        className={cn(
          "flex gap-1 p-2 border-b border-neutral-200",
          "dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800"
        )}
      >
        {name.map((n, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={cn(
              "px-3 py-1 text-sm rounded-lg transition-all",
              active === i
                ? cn(
                    "bg-white text-black",
                    "dark:bg-neutral-700 dark:text-white",
                    "font-semibold"
                  )
                : cn(
                    "text-neutral-600 dark:text-neutral-400",
                    "hover:text-black dark:hover:text-white"
                  )
            )}
          >
            {n}
          </button>
        ))}
      </div>
      <div className="px-2 bg-neutral-50 dark:bg-neutral-900">
        <CodeBlock lang={lang[active]} content={code[active]} key={active} />
      </div>
    </div>
  );
}
