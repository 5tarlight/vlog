"use client";

import { buildCoverUrl, PostMeta } from "@/lib/post/parser";
import cn from "@yeahx4/cn";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function PostSummary({
  meta,
  seriesName,
}: {
  meta: PostMeta;
  seriesName?: string;
}) {
  const router = useRouter();

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row items-start md:items-center p-4",
        "gap-4 md:gap-8 bg-white dark:bg-dark-bg rounded-lg shadow-lg",
        "dark:bg-gray-800 transition-all duration-300 hover:shadow-xl"
      )}
    >
      <div className="flex-shrink-0 w-full md:w-auto">
        <Image
          alt={meta.title}
          src={meta.cover ? `/img/cover/${meta.cover}` : buildCoverUrl(meta)}
          width={288}
          height={162}
          className="rounded-md object-cover w-full h-auto"
          priority
        />
      </div>
      <div
        className={cn(
          "flex flex-col text-light-text dark:text-dark-text gap-2"
        )}
      >
        <div>
          {meta.series && (
            <span
              className={cn(
                "text-xs md:text-sm text-blue-500 dark:text-purple-400",
                "hover:underline"
              )}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                router.push(`/series/${meta.series}`);
              }}
            >
              [{seriesName}]
            </span>
          )}
          <h2 className="text-lg md:text-xl font-bold">{meta.title}</h2>
        </div>
        <p
          className={cn(
            "text-sm md:text-base text-gray-500",
            "dark:text-gray-400 mb-4"
          )}
        >
          {meta.description}
        </p>
        <span className="text-xs md:text-sm">By {meta.author}</span>
        <time className="text-xs md:text-sm">
          {new Date(meta.date).toLocaleDateString()}
        </time>
      </div>
    </div>
  );
}
