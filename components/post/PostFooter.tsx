import { PostMeta } from "@/lib/post/parser";
import { getPostMeta, getPrevNextPosts } from "@/lib/post/posts";
import cn from "@yeahx4/cn";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

export default async function PostFooter({ meta }: { meta: PostMeta }) {
  const { next, prev } = getPrevNextPosts(meta.series, meta.seriesIndex);
  const prevMeta = prev ? await getPostMeta(prev) : null;
  const nextMeta = next ? await getPostMeta(next) : null;

  return (
    <div
      className={cn("flex flex-col md:flex-row justify-between gap-6 mt-16")}
    >
      {prev && prevMeta && (
        <Link
          href={`/posts/${prev}`}
          className={cn(
            "w-full md:w-1/2 border rounded-2xl p-6 transition-all hover:shadow-md",
            "border-neutral-300 dark:border-neutral-700",
            "bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800",
            "text-neutral-900 dark:text-neutral-100"
          )}
        >
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-sm">
              <FaArrowLeft className="text-neutral-500" />
              <span className="font-medium tracking-wide">이전 포스트</span>
            </div>
            <span className="text-lg font-semibold">{prevMeta.title}</span>
          </div>
          <div className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
            {prevMeta.description}
          </div>
        </Link>
      )}

      {next && nextMeta && (
        <Link
          href={`/posts/${next}`}
          className={cn(
            "w-full md:w-1/2 border rounded-2xl p-6 transition-all hover:shadow-md",
            "border-neutral-300 dark:border-neutral-700",
            "bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800",
            "text-neutral-900 dark:text-neutral-100",
            (!prev && "md:ml-auto") || ""
          )}
        >
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium tracking-wide">다음 포스트</span>
              <FaArrowRight className="text-neutral-500" />
            </div>
            <span className="text-lg font-semibold">{nextMeta.title}</span>
          </div>
          <div className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
            {nextMeta.description}
          </div>
        </Link>
      )}
    </div>
  );
}
