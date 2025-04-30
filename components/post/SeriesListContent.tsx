"use client";

import { PostMeta } from "@/lib/post/parser";
import { prettifyDate } from "@/lib/utils/date";
import cn from "@yeahx4/cn";
import Link from "next/link";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

export default function SeriesListContent({
  seriesPosts,
  current,
  seriesName,
}: {
  seriesPosts: { meta: PostMeta; post: string }[];
  current: number;
  seriesName: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={cn(
        "bg-white dark:bg-neutral-900",
        "border border-neutral-200 dark:border-neutral-700",
        "rounded-xl p-4 my-6 shadow-sm"
      )}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center justify-between w-full",
          "text-left text-base font-semibold tracking-wide",
          "text-neutral-800 dark:text-neutral-100"
        )}
      >
        {seriesName}
        {isOpen ? (
          <FaChevronUp className="text-neutral-500" />
        ) : (
          <FaChevronDown className="text-neutral-500" />
        )}
      </button>

      {isOpen && (
        <div className="mt-3 flex flex-col gap-1">
          {seriesPosts.map(({ meta, post }, index) => (
            <Link href={`/posts/${post}`} key={index}>
              <div
                className={cn(
                  "flex justify-between items-center px-2 py-1.5 rounded-md",
                  "transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800",
                  index === current
                    ? "bg-neutral-200 dark:bg-neutral-700 font-bold"
                    : "text-neutral-800 dark:text-neutral-200"
                )}
              >
                <div className="flex items-center gap-2 text-sm truncate">
                  <span className="min-w-[2.5rem] font-mono text-right">
                    {index + 1}.
                  </span>
                  <span className="truncate">{meta.title}</span>
                </div>
                <span className="hidden md:block text-xs font-mono text-neutral-500 dark:text-neutral-400">
                  {prettifyDate(meta.date)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
