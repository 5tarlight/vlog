import { PostMeta } from "@/lib/post/parser";
import { cn } from "@/lib/utils/cn";
import PostHead from "./PostHead";

export default function PostBody({
  meta,
  body,
}: {
  meta: PostMeta;
  body: string;
}) {
  return (
    <div
      className={cn(
        "max-w-[678px] w-full bg-white p-8 rounded-md shadow-md",
        "dark:bg-gray-800 dark:text-white transition-all break-all"
      )}
    >
      <div>
        <PostHead meta={meta} readingTime={Math.ceil(body.length / 200)} />
      </div>
      {body}
    </div>
  );
}
