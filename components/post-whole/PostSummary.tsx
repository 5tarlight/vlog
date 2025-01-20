import { buildCoverUrl, PostMeta } from "@/lib/post/parser";
import { prettifyDate } from "@/lib/utils/date";
import cn from "@yeahx4/cn";
import Image from "next/image";
import Link from "next/link";

export default function PostSummary({
  meta,
  seriesName,
  // content,
  id,
}: {
  id: string;
  meta: PostMeta;
  seriesName?: string;
  // content: string | ReactNode;
}) {
  const postUrl = `/posts/${id}`;

  return (
    <div
      className={cn(
        "gap-6 md:gap-6 flex flex-col md:flex-row",
        "border-y-2 dark:border-gray-500 border-gray-300 py-4 px-2"
      )}
    >
      <div>
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
          <h2 className="font-bold text-2xl">{meta.title}</h2>
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
          <p className="text-gray-500 dark:text-gray-300">{meta.description}</p>
        </Link>
        {/* <div className={cn("text-sm", "text-ellipsis overflow-hidden")}>
          {content}
        </div> */}
      </div>
    </div>
  );
}
