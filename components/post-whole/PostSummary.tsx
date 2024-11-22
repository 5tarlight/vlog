import { buildCoverUrl, PostMeta } from "@/lib/post/parser";
import cn from "@yeahx4/cn";
import Image from "next/image";

export default function PostSummary({ meta }: { meta: PostMeta }) {
  return (
    <div
      className={cn(
        "border-y flex flex-col md:flex-row items-start md:items-center p-4",
        "gap-4 md:gap-8 border-light-main dark:border-dark-main bg-light-bg",
        "dark:bg-dark-bg rounded-lg shadow-lg"
      )}
    >
      <div className="flex-shrink-0 w-full md:w-auto">
        <Image
          alt={meta.title}
          src={meta.cover ? `/img/cover/${meta.cover}` : buildCoverUrl(meta)}
          width={288}
          height={162}
          className="rounded-md object-cover w-full md:w-[288px] h-auto"
        />
      </div>
      <div
        className={cn(
          "flex flex-col text-light-text dark:text-dark-text gap-2"
        )}
      >
        <h2 className="text-lg md:text-xl font-bold">{meta.title}</h2>
        <p
          className={cn(
            "text-sm md:text-base text-light-secondary",
            "dark:text-dark-secondary"
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
