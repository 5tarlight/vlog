import { PostMeta } from "@/lib/post/parser";
import { cn } from "@/lib/utils/cn";
import Image from "next/image";
import Link from "next/link";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdOutlineWatchLater } from "react-icons/md";

export default function PostHead({
  meta,
  readingTime,
}: {
  meta: PostMeta;
  readingTime: number;
}) {
  return (
    <div className="mb-8 pb-8 border-b border-gray-300">
      {meta.series && (
        <Link
          href={`/series/${meta.series}`}
          className="mb-2 text-blue-500 dark:text-blue-300 hover:underline"
        >
          [{meta.series}] - ({meta.seriesIndex + 1})
        </Link>
      )}
      <h1 className="text-2xl font-bold mb-4">{meta.title}</h1>
      <p className="text-gray-500 dark:text-gray-400">{meta.description}</p>
      <a href="https://github.com/5tarlight" target="_blank">
        <div className="flex items-center mt-4">
          <Image
            src="/yeahx4.png"
            alt="YEAHx4"
            width={48}
            height={48}
            className="rounded-full border-2 border-blue-500"
          />
          <div className="flex flex-col ml-4">
            <p className="text-lg">YEAHx4</p>
            <div className="flex gap-2 items-center justify-center">
              <FaRegCalendarAlt /> {meta.date}
              <div className="items-center hidden sm:flex gap-2 ml-4">
                <MdOutlineWatchLater className="text-lg" /> {readingTime} min
              </div>
            </div>
          </div>
        </div>
      </a>
      <div className="flex flex-wrap mt-4 gap-2">
        {meta.tags.map((tag, idx) => (
          <Link
            key={idx}
            href={`/tags/${tag}`}
            className={cn(
              "text-blue-700 dark:text-blue-200 hover:underline",
              "px-4 py-1 bg-blue-200 dark:bg-blue-700 rounded-full",
              "hover:bg-blue-300 transition-all dark:hover:bg-blue-800",
              "text-sm text-center"
            )}
          >
            {tag}
          </Link>
        ))}
      </div>
    </div>
  );
}
