"use client";

import { useRouter } from "next/navigation";

export default function Tag({ children }: { children: string[] }) {
  const router = useRouter();

  return (
    <div className="flex tag-container">
      {children.map((tag, i) => (
        <div
          className="post-tag"
          key={i}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            router.push(`/tag/${tag}`);
          }}
        >
          {tag}
        </div>
      ))}
    </div>
  );
}
