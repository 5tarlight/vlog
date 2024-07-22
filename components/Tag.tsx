"use client";

import Link from "next/link";

export default function Tag({ children }: { children: string[] }) {
  return (
    <div className="flex tag-container">
      {children.map((tag, i) => (
        <Link href={`/tag/${tag}`} key={i} onClick={(e) => e.stopPropagation()}>
          <div className="post-tag">{tag}</div>
        </Link>
      ))}
    </div>
  );
}
