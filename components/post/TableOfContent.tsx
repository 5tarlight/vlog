"use client";

import { Toc } from "@/lib/post/parser";
import { useActiveHeading } from "@/lib/post/useActiveHeading";
import cn from "@yeahx4/cn";
import Link from "next/link";

export default function TableOfContent({ toc }: { toc: Toc[] }) {
  const ids = toc.map((t) => t.value);
  const activeId = useActiveHeading(ids);

  return (
    <div
      className={cn(
        "hidden lg:block w-full sticky top-56 h-fit",
        "transition-all border-neutral-300 hover:border-neutral-400",
        "border-l-2 dark:border-neutral-600 hover:dark:border-neutral-500"
      )}
    >
      <div className="mb-8 font-bold ml-4">Table of Contents</div>
      <ul className="flex flex-col gap-1">
        {toc.map((tocItem, idx) => {
          const isActive = activeId === tocItem.value;

          return (
            <li
              key={idx}
              className={cn(
                "relative pl-4 text-neutral-600",
                "hover:text-neutral-400 transition-colors duration-300",
                "dark:text-neutral-300 dark:hover:text-neutral-400",
                isActive ? "text-blue-500 font-semibold" : ""
              )}
              style={{
                marginLeft: `${tocItem.level - 1}rem`,
              }}
            >
              <Link href={`#${tocItem.value}`} className="break-all">
                {tocItem.value}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
