"use client";

import cn from "@yeahx4/cn";
import Link from "next/link";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

export default function PostPageNavigation({
  page,
  maxPage,
}: {
  page: number;
  maxPage: number;
}) {
  const isStart = page <= 1;
  const isEnd = page >= maxPage;

  return (
    <div className="flex font-bold gap-4 justify-center mb-8 items-center">
      <Link
        className={cn(
          "flex items-center gap-1",
          isStart
            ? "opacity-50 select-none pointer-events-none"
            : cn("hover:underline text-blue-600 dark:text-purple-400")
        )}
        href={isStart ? "" : `/posts?page=${page - 1}`}
        aria-disabled={isStart}
        onClick={(e) => isStart && e.preventDefault()}
        tabIndex={isStart ? -1 : 0}
      >
        <MdArrowBack />
        <span>Prev</span>
      </Link>
      <div>
        {page} / {maxPage}
      </div>
      <Link
        className={cn(
          "flex items-center gap-1",
          isEnd
            ? "opacity-50 select-none pointer-events-none"
            : cn("hover:underline text-blue-600 dark:text-purple-400")
        )}
        href={isEnd ? "" : `/posts?page=${page + 1}`}
        aria-disabled={isEnd}
        onClick={(e) => isEnd && e.preventDefault()}
        tabIndex={isEnd ? -1 : 0}
      >
        <span>Next</span>
        <MdArrowForward />
      </Link>
    </div>
  );
}
