import { PostMeta } from "@/lib/post/parser";
import { cn } from "@/lib/utils/cn";
import PostHead from "./PostHead";
import "./prose.css";
import { ReactNode } from "react";
import PostFooter from "./PostFooter";
import Comment from "./Comment";
import SeriesList from "./SeriesList";

export default function PostBody({
  meta,
  body,
  readingTime,
}: {
  meta: PostMeta;
  body: ReactNode[];
  readingTime: number;
}) {
  return (
    <div
      className={cn(
        "w-full bg-white md:p-8 p-4 rounded-md shadow-md",
        "dark:bg-gray-800 dark:text-white transition-all break-all"
      )}
    >
      <div>
        <PostHead meta={meta} readingTime={readingTime} />
      </div>
      {meta.series && (
        <SeriesList current={meta.seriesIndex} series={meta.series} />
      )}
      <div className="prose">{body}</div>
      {meta.series && <PostFooter meta={meta} />}
      <Comment />
    </div>
  );
}
