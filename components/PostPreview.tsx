import { buildCoverUrl, PostMeta } from "@/lib/post/parser";
import { series } from "@/lib/post/posts";
import { prettifyDate } from "@/lib/utils/date";
import cn from "@yeahx4/cn";
import Tag from "./post/Tag";
import { GoPencil } from "react-icons/go";
import { FaRegCalendar } from "react-icons/fa6";

export default function PostPreview({ meta }: { meta: PostMeta }) {
  return (
    <div
      className={cn(
        "bg-white dark:bg-neutral-800 rounded-lg shadow-md overflow-hidden",
        "transition-shadow duration-300 hover:shadow-lg ring-2 ring-neutral-200",
        "dark:ring-neutral-600 h-[370px]"
      )}
    >
      <img
        src={
          meta.cover
            ? `/img/cover/${meta.cover}`
            : // : "https://cdn.jsdelivr.net/gh/5tarlight/vlog-image@main/thumbnail/yeahx4bg.png"
              buildCoverUrl(meta)
        }
        alt={meta.title}
        className="w-full h-36 object-cover"
      />

      <div className="px-6 py-4 h-full">
        <div>
          <div
            className={cn(
              "text-neutral-500 dark:text-neutral-400 text-sm",
              "pb-2"
            )}
          >
            {meta.series ? (
              <span>
                Part {meta.seriesIndex + 1} of{" "}
                <strong>{series[meta.series].name}</strong>
              </span>
            ) : (
              <span className="italic">No Series</span>
            )}
          </div>

          <div className="flex gap-1">
            {meta.tags.slice(0, 3).map((tag, i) => (
              <Tag key={i}>{tag}</Tag>
            ))}
          </div>

          <h2
            className={cn(
              "font-bold text-xl text-neutral-800 dark:text-neutral-200 my-2",
              "line-clamp-2 h-14"
            )}
          >
            {meta.title}
          </h2>

          <p
            className={cn(
              "text-neutral-600 dark:text-neutral-400 line-clamp-2",
              "overflow-ellipsis h-12"
            )}
          >
            {meta.description}
          </p>

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
        </div>
      </div>
    </div>
  );
}
