import { PostMeta } from "@/lib/post/parser";
import { prettifyDate } from "@/lib/utils/date";
import cn from "@yeahx4/cn";
import Link from "next/link";
import Tag from "../post/Tag";
import { FaRegCalendar } from "react-icons/fa6";
import { GoPencil } from "react-icons/go";

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
    <Link href={postUrl} className="group">
      <div className="flex flex-col">
        <div className="text-neutral-500 dark:text-neutral-400 text-sm">
          {meta.series ? (
            <span>{seriesName}</span>
          ) : (
            <span className="italic">No Series</span>
          )}
        </div>

        <h2
          className={cn(
            "font-bold text-xl text-neutral-800 dark:text-neutral-200",
            "line-clamp-1 md:line-clamp-2 mb-2",
            "group-hover:underline group-hover:decoration-dashed",
            "group-hover:underline-offset-4 group-hover:decoration-neutral-400",
            "dark:group-hover:decoration-neutral-600"
          )}
        >
          {meta.title}
        </h2>

        <div className="flex gap-1">
          {meta.tags.slice(0, 3).map((tag, i) => (
            <Tag key={i}>{tag}</Tag>
          ))}
        </div>

        <div
          className={cn(
            "flex justify-start items-center text-sm text-neutral-500",
            "dark:text-neutral-400 gap-4 mt-2"
          )}
        >
          <div className="flex gap-2 items-center">
            <FaRegCalendar className="-mt-0.5" />
            <span>{prettifyDate(meta.date, "/")}</span>
          </div>
          <div className="flex gap-2 items-center">
            <GoPencil />
            <span>{meta.author}</span>
          </div>
        </div>

        <div
          className={cn(
            "text-neutral-600 dark:text-neutral-400 line-clamp-2",
            "overflow-ellipsis mt-2"
          )}
        >
          {meta.description}
        </div>
      </div>
    </Link>
  );
}
