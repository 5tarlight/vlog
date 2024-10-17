import { Toc } from "@/lib/post/parser";
import { cn } from "@/lib/utils/cn";
import Link from "next/link";

export default function TableOfContent({ toc }: { toc: Toc[] }) {
  return (
    <div
      className={cn(
        "hidden lg:block w-[286px] bg-white dark:bg-gray-800",
        "sticky top-28 h-fit p-8 rounded-md shadow-md border-l-8",
        "border-white hover:border-gray-300 transition-all",
        "hover:rounded-l-none dark:border-gray-800 dark:hover:border-gray-500"
      )}
    >
      <div className="mb-8 font-bold text-center">Table of Content</div>
      <ul className="flex flex-col gap-2">
        {toc.map((tocItem, idx) => (
          <li
            key={idx}
            className={cn(
              "relative pl-4 text-gray-700 hover:font-bold",
              "hover:text-blue-600 transition-colors duration-300",
              "dark:text-gray-300 dark:hover:text-blue-400"
            )}
            style={{
              marginLeft: `${tocItem.level * 1}rem`,
            }}
          >
            <Link
              href={`#${tocItem.value}`}
              className={cn(
                "before:absolute before:left-0 before:top-1/2 before:w-2",
                "before:h-2 before:bg-blue-300 before:rounded-full",
                "dark:before:bg-blue-700 before:w-[0.3rem] before:h-[0.3rem]"
              )}
            >
              {tocItem.value}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
