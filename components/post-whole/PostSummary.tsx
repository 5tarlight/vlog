import { buildCoverUrl, PostMeta } from "@/lib/post/parser";
import { prettifyDate } from "@/lib/utils/date";
import cn from "@yeahx4/cn";
import Image from "next/image";
import Link from "next/link";

export default function PostSummary({
  meta,
  seriesName,
  id,
}: {
  id: string;
  meta: PostMeta;
  seriesName?: string;
}) {
  const postUrl = `/posts/${id}`;

  return (
    <div
      className={cn(
        "gap-4 flex flex-col md:flex-row",
        "border-y-2 dark:border-gray-500 border-gray-300 py-4 px-2",
        "transition-all duration-300 ease-in-out"
      )}
    >
      <div className="flex-shrink-0 w-full md:w-1/3 mb-4 md:mb-0">
        <Link href={postUrl}>
          <Image
            alt={meta.title}
            src={meta.cover ? `/img/cover/${meta.cover}` : buildCoverUrl(meta)}
            width={288}
            height={162}
            className="rounded-md object-cover w-full h-auto"
            priority
          />
        </Link>
      </div>
      <div className="flex flex-col w-full">
        <Link href={postUrl} className="mb-2">
          <h2 className="font-bold text-xl md:text-2xl">{meta.title}</h2>
        </Link>
        <div className="flex gap-2 items-center text-sm text-gray-500 dark:text-gray-300">
          {seriesName && (
            <>
              <Link
                className="hover:underline text-blue-500 dark:text-purple-400"
                href={`/series/${meta.series}`}
              >
                [{seriesName}]
              </Link>
              <span> - </span>
            </>
          )}
          <span>{prettifyDate(meta.date)}</span>
        </div>
        <Link href={postUrl}>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            {meta.description}
          </p>
        </Link>
      </div>
    </div>
  );
}
