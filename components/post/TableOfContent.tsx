import { Toc } from "@/lib/post/parser";
import cn from "@yeahx4/cn";
import Link from "next/link";

export default function TableOfContent({ toc }: { toc: Toc[] }) {
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
        {toc.map((tocItem, idx) => (
          <li
            key={idx}
            className={cn(
              "relative pl-4 text-neutral-600",
              "hover:text-neutral-400 transition-colors duration-300",
              "dark:text-neutral-300 dark:hover:text-neutral-400"
            )}
            style={{
              marginLeft: `${tocItem.level - 1}rem`,
            }}
          >
            <Link href={`#${tocItem.value}`} className={cn("break-all")}>
              {tocItem.value}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
