import { PostMeta } from "@/lib/post/parser";
import cn from "@yeahx4/cn";

export default function PostSummary({ meta }: { meta: PostMeta }) {
  return (
    <div className={cn("border-y flex")}>
      <div className="">Image</div>
    </div>
  );
}
