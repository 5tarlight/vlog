"use client";

import { Post } from "@/libs/posts";
import { CiCalendar, CiClock2 } from "react-icons/ci";
import Tag from "./Tag";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PostPreview({ post }: { post: Post }) {
  const router = useRouter();
  return (
    <div
      className="post-preview"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        router.push(`/post/${post.slug}`);
      }}
    >
      <div className="post-preview-header">
        {post.series && (
          <Link href={`/series/${post.series}`}>{post.series}</Link>
        )}
        <h2 className="post-preview-title">{post.title}</h2>
        <div className="flex post-preview-detail">
          <div className="post-date">
            <CiCalendar /> <span>{post.date.split(" ")[0]}</span>
          </div>
          <div className="time-to-read">
            <CiClock2 /> <span>{post.readingMinutes}분</span>
          </div>
        </div>
      </div>
      <p className="post-preview-description">{post.description}</p>
      <Tag>{post.tags}</Tag>
      <div className="content-preview">
        {post.content
          .replaceAll("#", "")
          .replaceAll("-", "")
          .replaceAll("-", "")}
      </div>
    </div>
  );
}
