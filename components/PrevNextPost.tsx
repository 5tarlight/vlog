import { Post } from "@/libs/posts";
import PostPreview from "./PostPreview";
import PrevNextPostPreview from "./PrevNextPostPreview";

export default function PrevNextPost({
  prev,
  next,
}: {
  prev: Post | undefined;
  next: Post | undefined;
}) {
  return (
    <div className="prev-next-post-container">
      <PrevNextPostPreview post={prev} isPrev />
      <PrevNextPostPreview post={next} />
    </div>
  );
}
