import { Post } from "@/libs/posts";
import Link from "next/link";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

export default function PrevNextPostPreview({
  post,
  isPrev = false,
}: {
  post: Post | undefined;
  isPrev?: boolean;
}) {
  return (
    <div
      className={`prev-next-preview ${isPrev ? "prev" : "next"}-preview ${
        post ? "contentful-preview" : "empty-preview"
      }`}
    >
      {post ? (
        <Link href={`/post/${post.slug}`} className="a-none">
          <div className="pnp-header">
            <div>{isPrev ? "이전" : "다음"} 글</div>
            <div>{isPrev ? <FaArrowLeftLong /> : <FaArrowRightLong />}</div>
          </div>
          <div className="pnp-title">{post.title}</div>
          <div className="post-preview-description">{post.description}</div>
        </Link>
      ) : (
        // <div>{isPrev ? "이전" : "다음"} 글이 없습니다.</div>
        <></>
      )}
    </div>
  );
}
