import { PostMeta } from "@/lib/post/parser";
import PostHead from "./PostHead";
import cn from "@yeahx4/cn";
import "./prose.css";
import { ReactNode } from "react";
import PostFooter from "./PostFooter";
import Comment from "./Comment";
import SeriesList from "./SeriesList";
import PostSeparator from "../post-whole/PostSeparator";

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
    <div className={cn("w-full transition-all break-all")}>
      <PostHead meta={meta} readingTime={readingTime} />
      <PostSeparator />
      {meta.series && (
        <SeriesList current={meta.seriesIndex} series={meta.series} />
      )}
      <div className="prose">{body}</div>
      {meta.series && <PostFooter meta={meta} />}
      <Comment />
    </div>
  );
}
