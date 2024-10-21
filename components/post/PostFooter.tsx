import { PostMeta } from "@/lib/post/parser";
import { getPostMeta, getPrevNextPosts } from "@/lib/post/posts";
import { cn } from "@/lib/utils/cn";
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
            "w-full md:w-1/2 border-2 rounded-md p-6 hover:shadow-lg transition-all",
            "border-blue-300 dark:border-purple-700 text-right",
            "hover:bg-blue-50 dark:hover:bg-purple-900"
          )}
        >
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <FaArrowLeft className="text-blue-500 dark:text-purple-500" />
              <span className="font-semibold text-blue-700 dark:text-purple-300">
                이전 포스트
              </span>
            </div>
            <span className="text-lg font-bold text-blue-900 dark:text-purple-100">
              {prevMeta.title}
            </span>
          </div>
          <div className="mt-4 text-sm text-gray-700 dark:text-gray-300">
            {prevMeta.description}
          </div>
        </Link>
      )}

      {next && nextMeta && (
        <Link
          href={`/posts/${next}`}
          className={cn(
            "w-full md:w-1/2 border-2 rounded-md p-6 hover:shadow-lg transition-all",
            "border-blue-300 dark:border-purple-700",
            "hover:bg-blue-50 dark:hover:bg-purple-900",
            (!prev && "md:ml-auto") || ""
          )}
        >
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-blue-700 dark:text-purple-300">
                다음 포스트
              </span>
              <FaArrowRight className="text-blue-500 dark:text-purple-500" />
            </div>
            <span className="text-lg font-bold text-blue-900 dark:text-purple-100">
              {nextMeta.title}
            </span>
          </div>
          <div className="mt-4 text-sm text-gray-700 dark:text-gray-300">
            {nextMeta.description}
          </div>
        </Link>
      )}
    </div>
  );
}
