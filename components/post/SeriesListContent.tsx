"use client";

import { PostMeta } from "@/lib/post/parser";
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
    <div className="bg-blue-300 dark:bg-blue-600 p-6 rounded-md my-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-2 w-full outline-none"
      >
        <span className="font-bold">{seriesName}</span>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </button>

      {isOpen && (
        <div className="mt-4 flex flex-col gap-1">
          {seriesPosts.map(({ meta, post }, index) => (
            <Link href={`/posts/${post}`} key={index}>
              <div
                className={cn(
                  index === current ? "font-bold" : "",
                  "flex justify-between"
                )}
              >
                {index + 1}. {meta.title}
                <p className="text-sm text-gray-500 dark:text-gray-400 hidden md:block">
                  {meta.date}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
