import { buildCoverUrl, PostMeta } from "@/lib/post/parser";
import { series } from "@/lib/post/posts";
import cn from "@yeahx4/cn";

export default function PostPreview({ meta }: { meta: PostMeta }) {
  return (
    <div
      className={cn(
        "bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden",
        "transition-shadow duration-300 hover:shadow-lg h-[420px]"
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
        className="w-full h-48 object-cover"
      />

      <div className="p-6 h-full">
        <div>
          <h2
            className={cn(
              "font-bold text-xl text-gray-800 dark:text-gray-200 mb-2",
              "h-12 overflow-ellipsis"
            )}
          >
            {meta.title}
          </h2>
          <p
            className={cn(
              "text-gray-600 dark:text-gray-400 mb-4 h-16",
              "overflow-ellipsis"
            )}
          >
            {meta.description}
          </p>
          <div
            className={cn(
              "flex justify-between items-center text-sm text-gray-500",
              "dark:text-gray-400 mb-4"
            )}
          >
            <span>By {meta.author}</span>
            <span>{new Date(meta.date).toLocaleDateString()}</span>
          </div>
        </div>

        {meta.series && (
          <div
            className={cn(
              "text-gray-500 dark:text-gray-400 text-sm",
              "mt-4 pb-2"
            )}
          >
            <span>
              Part {meta.seriesIndex + 1} of{" "}
              <strong>{series[meta.series].name}</strong>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
